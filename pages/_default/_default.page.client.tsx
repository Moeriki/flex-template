import React from 'react';
import ReactDOM from 'react-dom';
import { getPage } from 'vite-plugin-ssr/client';

import { PageLayout } from './page-layout';

async function hydrate() {
  const { Page, pageProps } = await getPage();

  ReactDOM.hydrate(
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>,
    document.getElementById('page-view'),
  );
}

hydrate();
