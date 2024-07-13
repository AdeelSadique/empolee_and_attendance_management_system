import express from 'express';
import path from 'path';
import multer from 'multer';
import { login, logout, userRegisteration } from '../controllers/adminController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attendance } from '../controllers/attendance.js';
import { imageUploader } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(userRegisteration);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated, logout);
router.route('/attendance').post(imageUploader, attendance);

export default router;
