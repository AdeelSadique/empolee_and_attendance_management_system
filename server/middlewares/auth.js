import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      next(new ErrorHandler('Unauthorized user', 400));
    } else {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(decodeToken._id);
      req.user = user._id;
      next();
    }
  } catch (error) {
    next(error);
  }
};
