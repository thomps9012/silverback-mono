import { describe, expect, it } from 'vitest';

import { buildResponsiveImage } from './responsive_image';

describe('buildResponsiveImage()', () => {
  const credentials = {
    secret: 'test',
    key: 'test',
    cloudname: 'demo',
  };

  const imageProps = {
    src: 'http://www.example.com/test_image.png',
    width: 1600,
    height: 1200,
  };

  it('asks for the original image', () => {
    const result = JSON.parse(buildResponsiveImage(credentials, imageProps));
    expect(result).toStrictEqual({
      originalSrc: 'http://www.example.com/test_image.png',
      ...imageProps,
    });
  });

  it('asks for a width (scale image)', () => {
    const result = JSON.parse(
      buildResponsiveImage(credentials, imageProps, {
        width: 600,
      }),
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 450,
        "originalSrc": "http://www.example.com/test_image.png",
        "src": "https://res.cloudinary.com/demo/image/fetch/s--1SSv3TAe--/f_auto/q_auto/c_scale,w_600/http://www.example.com/test_image.png",
        "width": 600,
      }
    `);
  });

  it('asks for a width and height', () => {
    const result = JSON.parse(
      buildResponsiveImage(credentials, imageProps, {
        width: 600,
        height: 400,
      }),
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 400,
        "originalSrc": "http://www.example.com/test_image.png",
        "src": "https://res.cloudinary.com/demo/image/fetch/s--oQnrp4QO--/f_auto/q_auto/c_fill,g_auto,h_400,w_600/http://www.example.com/test_image.png",
        "width": 600,
      }
    `);
  });

  it('asks for a custom transformation', () => {
    const result = JSON.parse(
      buildResponsiveImage(credentials, imageProps, {
        width: 600,
        height: 400,
        transform: 'c_lfill,h_150,w_150',
      }),
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 400,
        "originalSrc": "http://www.example.com/test_image.png",
        "src": "https://res.cloudinary.com/demo/image/fetch/s--iBYmBJnf--/f_auto/q_auto/c_fill,g_auto,h_400,w_600/c_lfill,h_150,w_150/http://www.example.com/test_image.png",
        "width": 600,
      }
    `);
  });

  it('asks for sizes', () => {
    const result = JSON.parse(
      buildResponsiveImage(credentials, imageProps, {
        width: 1600,
        sizes: [
          [800, 780],
          [1200, 1100],
        ],
      }),
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 1200,
        "originalSrc": "http://www.example.com/test_image.png",
        "sizes": "(max-width: 800px) 780px, (max-width: 1200px) 1100px, 1600px",
        "src": "https://res.cloudinary.com/demo/image/fetch/s--do7-bAD9--/f_auto/q_auto/c_scale,w_1600/http://www.example.com/test_image.png",
        "srcset": "https://res.cloudinary.com/demo/image/fetch/s--MZkCHWuY--/f_auto/q_auto/c_scale,w_780/http://www.example.com/test_image.png 780w, https://res.cloudinary.com/demo/image/fetch/s--xlf_u2mA--/f_auto/q_auto/c_scale,w_1100/http://www.example.com/test_image.png 1100w",
        "width": 1600,
      }
    `);
  });

  it('asks for a complete test, with height calculation and custom transformations', () => {
    const result = JSON.parse(
      buildResponsiveImage(credentials, imageProps, {
        width: 1600,
        height: 1200,
        sizes: [
          [800, 780],
          [1200, 1100],
        ],
        transform: 'co_rgb:000000,e_colorize:90',
      }),
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 1200,
        "originalSrc": "http://www.example.com/test_image.png",
        "sizes": "(max-width: 800px) 780px, (max-width: 1200px) 1100px, 1600px",
        "src": "https://res.cloudinary.com/demo/image/fetch/s--PYehk6Pp--/f_auto/q_auto/c_fill,g_auto,h_1200,w_1600/co_rgb:000000,e_colorize:90/http://www.example.com/test_image.png",
        "srcset": "https://res.cloudinary.com/demo/image/fetch/s--0q-v7sf8--/f_auto/q_auto/c_fill,g_auto,h_585,w_780/co_rgb:000000,e_colorize:90/http://www.example.com/test_image.png 780w, https://res.cloudinary.com/demo/image/fetch/s--1PnC9sUX--/f_auto/q_auto/c_fill,g_auto,h_825,w_1100/co_rgb:000000,e_colorize:90/http://www.example.com/test_image.png 1100w",
        "width": 1600,
      }
    `);
  });

  it('returns a mock image when cloudname is "test"', () => {
    const result = JSON.parse(
      buildResponsiveImage(
        {
          cloudname: 'test',
          key: '000',
          secret: 'FFF',
        },
        imageProps,
        {
          width: 1600,
          height: 1200,
          sizes: [
            [800, 780],
            [1200, 1100],
          ],
        },
      ),
    );
    expect(result).toMatchInlineSnapshot(`
      {
        "height": 1200,
        "originalSrc": "http://www.example.com/test_image.png",
        "sizes": "(max-width: 800px) 780px, (max-width: 1200px) 1100px, 1600px",
        "src": "data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"1600\\" height=\\"1200\\" viewBox=\\"0 0 1600 1200\\"><rect x=\\"0\\" y=\\"583\\" width=\\"100%\\" height=\\"30\\" fill=\\"rgba(0,0,0,0.5)\\"></rect><text fill=\\"#EEE\\" x=\\"50%\\" y=\\"50%\\" style=\\"font-family: sans-serif; font-size: 1em;font-weight:bold;text-anchor: middle; dominant-baseline: middle;\\">1600 x 1200</text></svg>",
        "srcset": "data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"780\\" height=\\"585\\" viewBox=\\"0 0 780 585\\"><rect x=\\"0\\" y=\\"275.5\\" width=\\"100%\\" height=\\"30\\" fill=\\"rgba(0,0,0,0.5)\\"></rect><text fill=\\"#EEE\\" x=\\"50%\\" y=\\"50%\\" style=\\"font-family: sans-serif; font-size: 1em;font-weight:bold;text-anchor: middle; dominant-baseline: middle;\\">780 x 585</text></svg> 780w, data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"1100\\" height=\\"825\\" viewBox=\\"0 0 1100 825\\"><rect x=\\"0\\" y=\\"395.5\\" width=\\"100%\\" height=\\"30\\" fill=\\"rgba(0,0,0,0.5)\\"></rect><text fill=\\"#EEE\\" x=\\"50%\\" y=\\"50%\\" style=\\"font-family: sans-serif; font-size: 1em;font-weight:bold;text-anchor: middle; dominant-baseline: middle;\\">1100 x 825</text></svg> 1100w",
        "width": 1600,
      }
    `);
  });
});
