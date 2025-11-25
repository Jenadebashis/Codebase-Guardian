import express from 'express';
import { createScan, getAllScans, getScanById, unifiedScanHandler } from '../controllers/scanController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation chain for creating a scan from text
const createScanValidation = [
  body('codeSnippet')
    .isString().withMessage('Code snippet must be a string.')
    .isLength({ max: 500000 }).withMessage('Code snippet is too long.')
    .trim()
    .escape(),
  body('language').isString().withMessage('Language must be a string.'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route for creating a scan from either raw text or file upload
router.post('/', auth, upload.single('codeFile'), createScanValidation, handleValidationErrors, unifiedScanHandler);

router.get('/', auth, getAllScans);
router.get('/:id', auth, getScanById);

export default router;
