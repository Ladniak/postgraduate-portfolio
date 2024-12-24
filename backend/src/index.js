import express from 'express';
import cors from 'cors';
import usersRouter from './routers/user.js';
import { initMongoConnection } from './db/initMongoConection.js';
import postsRouter from './routers/post.js';

const app = express();

initMongoConnection();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/', usersRouter);
app.use('/', postsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
