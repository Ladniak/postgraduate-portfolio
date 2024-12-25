import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),
  body('name')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters'),
  body('avatarUrl')
    .optional()
    .isURL()
    .withMessage('Invalid URL format for avatar'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),
];

export const postCreateValidation = [
  body('title', 'Enter title of the postgraduate')
    .isLength({ min: 5 })
    .isString(),
  body('text', 'Enter text of the postgraduate')
    .isLength({ min: 10 })
    .isString(),
  body('imageUrl', 'Invalid link').optional().isString(),
];
