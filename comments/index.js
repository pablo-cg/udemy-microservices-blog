import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { nanoid } from 'nanoid';

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params;

  res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const { id: postId } = req.params;

  const commentId = nanoid(6);

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[postId] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((c) => c.id === id);

    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('🚀 Comments Service on Port:', 4001);
});
