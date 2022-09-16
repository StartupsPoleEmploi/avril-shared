import express from 'express';
import consola from 'consola';
import { Nuxt, Builder } from 'nuxt';

export default async config => {
  config.dev = process.env.NODE_ENV !== 'production';

  const app = express();

  app.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
  });

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });

  return app;
}
