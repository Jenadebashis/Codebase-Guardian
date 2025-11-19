import express from 'express';
import { createScan } from '../controllers/scanController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(auth, createScan);

export default router;
