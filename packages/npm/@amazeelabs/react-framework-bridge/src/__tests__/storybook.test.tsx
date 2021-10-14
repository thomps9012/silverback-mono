import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from 'formik';
import React from 'react';

import { buildForm, buildImage, buildLink } from '../storybook';

const action = jest.fn();

jest.mock('@storybook/addon-actions', () => ({
  action: () => action,
}));

beforeEach(jest.resetAllMocks);

describe('buildLink', () => {
  it('can build a link from segments and query parameters', () => {
    const Link = buildLink({
      segments: ['/foo', 'bar'],
      query: {
        a: 'b',
      },
    });
    expect(Link.href).toEqual('/foo/bar?a=b');
    render(<Link>Test</Link>);
    expect(screen.getByRole('link').getAttribute('href')).toEqual(
      '/foo/bar?a=b',
    );
  });

  it('can build a link only from query parameters', () => {
    const Link = buildLink({
      query: {
        a: 'b',
      },
    });
    expect(Link.href).toEqual('?a=b');
    render(<Link>Test</Link>);
    expect(screen.getByRole('link').getAttribute('href')).toEqual('?a=b');
  });

  it('allows the consumer to set query parameters', () => {
    const Link = buildLink<{ a: string }>({
      href: '/foo',
    });
    expect(Link.href).toEqual('/foo');
    render(<Link query={{ a: 'b' }}>Test</Link>);
    expect(screen.getByRole('link').getAttribute('href')).toEqual('/foo?a=b');
  });

  it('allows the consumer to override query parameters', () => {
    const Link = buildLink<{ a: string }>({
      href: '/foo',
      query: { a: 'b' },
    });
    expect(Link.href).toEqual('/foo?a=b');
    render(<Link query={{ a: 'c' }}>Test</Link>);
    expect(screen.getByRole('link').getAttribute('href')).toEqual('/foo?a=c');
  });

  it('allows the consumer to set a query fragment', () => {
    const Link = buildLink({
      href: '/foo',
    });
    expect(Link.href).toEqual('/foo');
    render(<Link fragment="bar">Test</Link>);
    expect(screen.getByRole('link').getAttribute('href')).toEqual('/foo#bar');
  });

  it('allows the consumer to set query parameters and fragments', () => {
    const Link = buildLink<{ a: string }>({
      href: '/foo',
    });
    expect(Link.href).toEqual('/foo');
    render(
      <Link query={{ a: 'b' }} fragment="bar">
        Test
      </Link>,
    );
    expect(screen.getByRole('link').getAttribute('href')).toEqual(
      '/foo?a=b#bar',
    );
  });

  it('renders a simple link', () => {
    const Link = buildLink({ href: '#test' });
    expect(Link.href).toEqual('#test');
    render(<Link>test</Link>);
    expect(screen.getByRole('link').textContent).toEqual('test');
    expect(screen.getByRole('link').getAttribute('href')).toEqual('#test');
  });

  it('allows to pass a class', () => {
    const Link = buildLink({ href: '#test' });
    expect(Link.href).toEqual('#test');
    render(<Link className={'text-red'}>test</Link>);
    expect(screen.getByRole('link').getAttribute('class')).toEqual('text-red');
  });

  it('applies active class if the path contains "active"', () => {
    const Link = buildLink({ href: '/imsoactive' });
    expect(Link.href).toEqual('/imsoactive');
    render(
      <Link className={'text-red'} activeClassName={'text-green'}>
        test
      </Link>,
    );

    expect(screen.getByRole('link').getAttribute('class')).toEqual(
      'text-red text-green',
    );
  });

  it('does not break if path contains "active" and no active class is defined', () => {
    const Link = buildLink({ href: '/imsoactive' });
    expect(Link.href).toEqual('/imsoactive');
    render(<Link className={'text-red'}>test</Link>);
    expect(screen.getByRole('link').getAttribute('class')).toEqual('text-red');
  });

  it('logs a storybook action on click', () => {
    const Link = buildLink({ href: '#test' });
    expect(Link.href).toEqual('#test');
    render(<Link>test</Link>);
    fireEvent.click(screen.getByRole('link'));
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith('#test');
  });

  it('exposes a navigate function that logs a storybook action', () => {
    const Link = buildLink({ href: '#test' });
    expect(Link.href).toEqual('#test');
    Link.navigate();
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith('#test');
  });

  it('exposes a navigate function that logs a storybook action and allows to override queries and fragments', () => {
    const Link = buildLink({ href: '/foo', query: { a: 'b' } });
    expect(Link.href).toEqual('/foo?a=b');
    Link.navigate({ query: { a: 'c' }, fragment: 'bar' });
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith('/foo?a=c#bar');
  });
});

describe('buildImage', () => {
  it('renders an image with all attributes', () => {
    const Image = buildImage({ src: 'test.png', alt: 'Test' });
    expect(Image.src).toEqual('test.png');
    render(<Image />);
    expect(screen.getByRole('img').getAttribute('src')).toEqual('test.png');
    expect(screen.getByRole('img').getAttribute('alt')).toEqual('Test');
  });

  it('allows to specify a classname', () => {
    const Image = buildImage({ src: 'test.png', alt: 'Test' });
    expect(Image.src).toEqual('test.png');
    render(<Image className={'border-red'} />);
    expect(screen.getByRole('img').getAttribute('class')).toEqual('border-red');
  });
});

describe('buildForm', () => {
  it('logs a storybook action on submit', async () => {
    const Form = buildForm({ initialValues: { foo: '' } });
    render(
      <Form>
        <Field type="text" name="foo" />
        <button type="submit" />
      </Form>,
    );
    userEvent.type(screen.getByRole('textbox'), 'bar');
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ foo: 'bar' });
    });
  });
});