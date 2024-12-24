import express from 'express';
import {
  registerValidation,
  loginValidation,
} from '../validations/validations.js';
import checkAuth from '../utils/checkAuth.js';

import * as userControllers from '../controllers/user.js';
import handleValidationErrors from '../utils/handleValidationErrors.js';

const usersRouter = express.Router();

usersRouter.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  userControllers.login,
);

usersRouter.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  userControllers.register,
);

usersRouter.get('/auth/me', checkAuth, userControllers.getMe);

export default usersRouter;
