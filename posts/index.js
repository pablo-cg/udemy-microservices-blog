import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { nanoid } from 'nanoid';

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = nanoid(6);
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  });

  res.status(201).send({ id, title });
});

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(`Received event ${event.type}`);
  res.send({});
});

app.listen(4000, () => {
  console.log('🚀 v3');
  console.log('🚀 Post Service on Port:', 4000);
});
