import * as path from 'path';

import Koa from 'koa';
import compress from 'koa-compress';
import connect from 'koa-connect';
import serve from 'koa-static';
import * as vite from 'vite';
import * as ssr from 'vite-plugin-ssr';

const isTest =
  process.env.NODE_ENV === 'test' || Boolean(process.env.VITE_TEST_BUILD);
const port = process.env.WEB_PORT ?? 3000;

export async function createServer({
  isProduction = process.env.NODE_ENV === 'production',
  root = process.cwd(),
}: { isProduction?: boolean; root?: string } = {}) {
  const resolve = (filepath: string) => path.resolve(root, filepath);

  const app = new Koa();

  let viteDevServer: vite.ViteDevServer | undefined;
  if (isProduction) {
    app.use(compress());
    app.use(serve(resolve('/dist/client')));
  } else {
    viteDevServer = await vite.createServer({
      logLevel: isTest ? 'error' : 'info',
      root,
      server: { middlewareMode: true },
    });
    app.use(connect(viteDevServer.middlewares));
  }

  const render = ssr.createRender({ isProduction, root, viteDevServer });

  app.use(serve(resolve('/public')));

  app.use(async ({ request, response }) => {
    response.set('content-type', 'text/html');
    response.body = await render({
      contextProps: {},
      url: request.originalUrl,
    });
  });

  return { app, viteDevServer };
}

if (!isTest) {
  (async () => {
    try {
      const { app } = await createServer();
      app.listen(port);
    } catch (error) {
      console.error(error);
    }
  })();
}
