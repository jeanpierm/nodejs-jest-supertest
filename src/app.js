import express from 'express';
import crypto from 'crypto';

const app = express();

app.use(express.json());

app.get('/pin', (req, res) => {
  res.send('pong');
});

app.get('/tasks', (req, res) => {
  const payload = [{ id: 1, title: 'learn jest' }];
  res.status(200).json(payload);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.sendStatus(400);
  }
  const payload = { id: crypto.randomUUID(), title, description };
  res.status(201).json(payload);
});

export default app;
