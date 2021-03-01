import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { html } from 'vite-plugin-ssr';

import { PageLayout } from './page-layout';

export function render({
  Page,
  pageProps,
  contextProps,
}: {
  Page: (pageProps: any) => JSX.Element;
  pageProps: any;
  contextProps: { title?: string };
}) {
  const pageHtml = ReactDOMServer.renderToString(
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>,
  );

  const title = contextProps.title || 'My SSR Vite App';

  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${html.sanitize(title)}</title>
      </head>
      <body>
        <div id="page-view">${html.dangerouslySetHtml(pageHtml)}</div>
      </body>
    </html>`;
}
