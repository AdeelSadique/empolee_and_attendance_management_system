import express from 'express';
import path from 'path';
import multer from 'multer';
import { login, logout, userRegisteration, me, getAttendance, getAllEmployees } from '../controllers/adminController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attendance } from '../controllers/attendance.js';
import { imageUploader } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(userRegisteration);
router.route('/login').post(login);
router.route('/me').get(isAuthenticated, me);
router.route('/logout').get(isAuthenticated, logout);
router.route('/attendance').post(imageUploader, attendance);
router.route('/getAttendance').get(isAuthenticated, getAttendance);
router.route('/employees').get(isAuthenticated, getAllEmployees);

export default router;
