import express from 'express';
import nuxtConfig from '../nuxt.config.js';
const app = express();

console.log(nuxtConfig);
app.get(`${nuxtConfig.router.base}/healthcheck`, (_req, res) => {
  console.log('dude!!')
  return res.sendStatus(200)
});

export default app;