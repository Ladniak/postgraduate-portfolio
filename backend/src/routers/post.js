import express from 'express';
import multer from 'multer';
import fs from 'fs';
import * as postControllers from '../controllers/post.js';
import { postCreateValidation } from '../validations/validations.js';
import checkAuth from '../utils/checkAuth.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const postsRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

postsRouter.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

postsRouter.get('/posts', postControllers.getAll);
postsRouter.get('/posts/:id', postControllers.getOne);
postsRouter.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  upload.array('files', 5),
  postControllers.create,
);
postsRouter.delete('/posts/:id', postControllers.remove);
postsRouter.patch(
  '/posts/:id',
  postCreateValidation,
  handleValidationErrors,
  postControllers.update,
);

export default postsRouter;
