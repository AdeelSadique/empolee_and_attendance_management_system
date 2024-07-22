import { attendanceModel } from '../models/attendance.js';
import { userModel } from '../models/user.js';
import { ErrorHandler } from '../utils/errorHandler.js';
import fs from 'fs';

export const attendance = async (req, res, next) => {
  const { userID } = req.body;
  const image = req.file;

  try {
    if (!userID || !image) {
      image && fs.rm(image?.path, () => {});
      next(new ErrorHandler('userId and Image required', 400));
    } else {
      // finding the user in db
      const user = await userModel.findOne({ userID });
      if (!user) {
        image && fs.rm(image?.path, () => {});
        next(new ErrorHandler('Unauthorized User', 400));
      } else {
        // save the attendance in db
        const attendanceUser = await attendanceModel.findOne({ user: user._id });

        attendanceUser.attendance.push({ date: Date(), image: `${process.env.BACKEND_URL}/attendance_images/${image.filename}` });
        await attendanceUser.save();
        res.status(200).json({ status: true, message: 'Thank You for Verification' });
      }
    }
  } catch (error) {
    image && fs.rm(image?.path, () => {});
    next(error);
  }
};
