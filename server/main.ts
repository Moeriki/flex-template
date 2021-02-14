import { readFileSync } from 'fs';
import * as path from 'path';

import fastify from 'fastify';
import compress from 'fastify-compress';
import serve from 'fastify-static';
import middie from 'middie';
import { createServer as createViteServer } from 'vite';

const isTest =
  process.env.NODE_ENV === 'test' || Boolean(process.env.VITE_TEST_BUILD);
const port = process.env.WEB_PORT ?? 3000;

export async function createServer({
  isProd = process.env.NODE_ENV === 'production',
  root = process.cwd(),
}: { isProd?: boolean; root?: string } = {}) {
  const resolve = (filepath: string) => path.resolve(root, filepath);

  const app = fastify({ logger: true });
  await app.register(middie);

  if (isProd) {
    const template = readFileSync(resolve('dist/csr/index.html'), 'utf-8');

    app.register(compress);
    app.register(serve, {
      index: false as any,
      root: resolve('dist/csr/assets/'),
      prefix: '/assets',
    });

    app.get('*', async (request, reply) => {
      const { render } = require(resolve('dist/ssr/main-ssr.js'));
      const appHtml = await render(request.url, {});
      const html = template.replace(`<!--ssr-->`, appHtml);
      reply.code(200).type('text/html').send(html);
    });

    return { app };
  }

  const vite = await createViteServer({
    logLevel: isTest ? 'error' : 'info',
    root,
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);

  app.addHook('onRequest', async (req, reply) => {
    const url = req.url;
    try {
      const ssrTemplate = readFileSync(path.join(root, 'index.html'), 'utf-8');
      const template = await vite.transformIndexHtml(url, ssrTemplate);

      const { render } = await vite.ssrLoadModule(
        path.join(__dirname, '../client/main-ssr'),
      );

      const appHtml = await render(url, {});
      const html = template.replace(`<!--ssr-->`, appHtml);

      reply.code(200).type('text/html').send(html);
    } catch (error) {
      vite!.ssrFixStacktrace(error);
      throw error;
    }
  });

  return { app, vite };
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
