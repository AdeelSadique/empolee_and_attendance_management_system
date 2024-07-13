import { ErrorHandler } from '../utils/errorHandler.js';

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  //   checking if data is duplicate
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ status: false, message: err.message });
};
