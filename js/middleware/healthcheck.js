import express from 'express';
const app = express();

app.get('/', (req, res) => {
  console.log('dude!!')
  console.log(req)
  return res.sendStatus(200)
});

export default app;