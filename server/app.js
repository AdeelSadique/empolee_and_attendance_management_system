import express from 'express';
import dotenv from 'dotenv';
import { adminRoutes } from './apis/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
const app = express();
dotenv.config({ path: '.env' });
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', '*'], credentials: true }));
// app.use(errorMiddleware);
// routes middleware
app.use('/api', [adminRoutes], errorMiddleware);
export default app;
