import express from 'express';
import { createScan, getAllScans, getScanById } from '../controllers/scanController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(auth, createScan).get(auth, getAllScans);
router.route('/:id').get(auth, getScanById);

export default router;
