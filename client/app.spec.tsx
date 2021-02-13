import React from 'react';

import { render, screen } from '../spec/testing-library';
import { App } from './app';

test('render App', () => {
  render(<App />);
  expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument();
});
