import express from 'express';
const app = express();

app.get('/', (req, res) => {
  return res.sendStatus(200)
});

export default app;