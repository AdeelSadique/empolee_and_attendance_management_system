import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './apis/index.js';
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
app.use(cors({ origin: '*', credentials: true }));
// app.use(errorMiddleware);
// routes middleware
app.use('/api', [userRoutes], errorMiddleware);
export default app;
