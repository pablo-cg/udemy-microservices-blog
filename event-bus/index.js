import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;

  events.push(event);

  // POST
  await axios.post('http://posts-clusterip-srv:4000/events', event).catch((error) => {
    console.log(error);
  });

  // COMMENTS
  await axios.post('http://comments-srv:4001/events', event).catch((error) => {
    console.log(error);
  });

  // QUERY
  await axios.post('http://query-srv:4002/events', event).catch((error) => {
    console.log(error);
  });

  // MODERATION
  await axios.post('http://moderation-srv:4003/events', event).catch((error) => {
    console.log(error);
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('🚀 Event Bus Service on port:', 4005);
});
