import colors from 'colors';
import { cosmiconfigSync } from 'cosmiconfig';
import express from 'express';
import expressWs from 'express-ws';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createHttpTerminator } from 'http-terminator';
import morgan from 'morgan';
import * as path from 'path';
import { filter, shareReplay, Subject } from 'rxjs';

import { BuildService } from './server/build';
import {
  GatewayCommands,
  GatewayService,
  GatewayState,
  isGatewayState,
} from './server/gateway';
import {
  buildStatusLogs,
  gatewayStatusLogs,
  statusUpdates,
} from './server/logging';

const ews = expressWs(express());
const { app } = ews;
app.use(morgan('dev'));

const explorerSync = cosmiconfigSync('publisher');
const loadedConfig = explorerSync.search();
const config = {
  cleanCommand: 'yarn clean',
  startCommand: 'yarn start',
  startRetries: 3,
  readyPattern: /http:\/\/.*?:3000/,
  buildCommand: 'yarn build',
  buildBufferTime: 500,
  buildRetries: 3,
  gatewayPort: 3001,
  applicationPort: 3000,
  ...(loadedConfig?.config || {}),
};

const gatewayCommands$ = new Subject<GatewayCommands>();
const buildEvents$ = new Subject<{}>();

const gateway$ = gatewayCommands$.pipe(
  GatewayService(config),
  shareReplay(100),
);

app.locals.isReady = false;

gateway$.pipe(filter(isGatewayState)).subscribe((state) => {
  app.locals.isReady = state === GatewayState.Ready;
});

const builder$ = buildEvents$.pipe(BuildService(config), shareReplay(100));

app.post('/___status/build', (req, res) => {
  buildEvents$.next(req.body);
  res.json(true);
});

app.post('/___status/clean', (req, res) => {
  gatewayCommands$.next('clean');
  res.json(true);
});

app.ws('/___status/gateway/logs', (ws) => {
  const sub = gatewayStatusLogs(gateway$).subscribe((data) => {
    ws.send(data.chunk);
  });
  ws.on('close', sub.unsubscribe);
});

app.ws('/___status/builder/logs', (ws) => {
  const sub = buildStatusLogs(builder$).subscribe((data) => {
    ws.send(data.chunk);
  });
  ws.on('close', sub.unsubscribe);
});

app.ws('/___status/updates', (ws) => {
  const sub = statusUpdates(gateway$, builder$).subscribe((data) => {
    ws.send(JSON.stringify(data));
  });

  ws.on('close', sub.unsubscribe);
});

app.use('/___status', express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res, next) => {
  if (!req.app.locals.isReady) {
    if (req.accepts('text/html')) {
      res.redirect(302, `/___status/status.html?dest=${req.originalUrl}`);
    } else {
      res.status(404);
    }
    res.end();
  }
  next();
});

app.use(
  '/',
  createProxyMiddleware(() => app.locals.isReady, {
    target: `http://127.0.0.1:${config.applicationPort}`,
  }),
);

const server = app.listen(config.gatewayPort);
const terminator = createHttpTerminator({ server });
const sub = gateway$.subscribe();
gatewayCommands$.next('start');

process.on('SIGINT', function () {
  console.log(colors.bgMagenta('⏱ Stopping publisher service.'));
  sub.unsubscribe();
  return terminator.terminate().then(() => {
    console.log(colors.bgCyan('🛑 Publisher service stopped.'));
    return process.exit();
  });
});