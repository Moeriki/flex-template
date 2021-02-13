import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { TestProvider } from './provider';

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: TestProvider, ...options });

export { customRender as render };

export * from '@testing-library/react';
