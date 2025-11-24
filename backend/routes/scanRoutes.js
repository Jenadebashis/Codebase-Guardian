import express from 'express';
import { createScan, getAllScans, getScanById } from '../controllers/scanController.js';
import auth from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation chain for creating a scan
const createScanValidation = [
  body('codeSnippet')
    .isString().withMessage('Code snippet must be a string.')
    .isLength({ max: 500000 }).withMessage('Code snippet is too long.')
    .trim()
    .escape(),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.route('/')
  .post(auth, createScanValidation, handleValidationErrors, createScan)
  .get(auth, getAllScans);

router.route('/:id').get(auth, getScanById);

export default router;
