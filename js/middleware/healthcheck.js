import express from 'express';
const app = express();

app.get('/', (_req, res) => {
  console.log('dude!!')
  return res.sendStatus(200)
});

export default app;