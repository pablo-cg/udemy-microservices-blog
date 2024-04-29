import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

function handleEvent(type, data) {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((c) => c.id === id);

    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('🚀 Query Service on port:', 4002);

  try {
    const { data } = await axios.get('http://event-bus-srv:4005/events');

    for (const event of data) {
      console.log('🤖 ~ Processing event:', event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.error(error);
  }
});
