import { body } from 'express-validator';

// import multer from 'multer';

// const storage = multer.memoryStorage();
// export const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = [
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'application/pdf',
//     ];

//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Тільки файли формату DOC, DOCX або PDF дозволені.'));
//     }
//   },
// });

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

  // (req, res, next) => {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'Файл обов’язковий для завантаження.' });
  //   }

  //   // Додаткові перевірки (наприклад, розмір)
  //   if (req.file.size > 10 * 1024 * 1024) {
  //     return res.status(400).json({ error: 'Файл перевищує допустимий розмір 10MB.' });
  //   }

  //   next();
  // }
];
