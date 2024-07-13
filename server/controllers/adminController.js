import { userModel } from '../models/user.js';
import { attendanceModel } from '../models/attendance.js';
import { ErrorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const userRegisteration = async (req, res, next) => {
  try {
    const { name, email, password, dob, gender, department, job, salary } = req.body;
    // generating unique id
    let userID = `${department}10`;
    // }
    let totalUsers = await userModel.find().countDocuments();
    userID += totalUsers + 1;
    const user = await userModel.create({ name, email, password, dob, gender, department, job, salary, userID });
    console.log(user);
    await attendanceModel.create({ user: user._id });

    res.status(201).json({ status: true, message: 'User is Registered Successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    // res.json({ user });
    if (user?.email != email || user?.password != password) {
      next(new ErrorHandler('Invalid Email or Password', 404));
    } else {
      // we will set the session
      const cookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE === 'development' ? 'lax' : 'none',
        secure: process.env.NODE === 'development' ? false : true,
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
      };

      // now create the jwt token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

      res.cookie('token', token, cookieOptions).status(200).json({ message: 'logged' });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    // we will destroy the session
    const cookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE === 'development' ? 'lax' : 'none',
      secure: process.env.NODE === 'development' ? false : true,
      expires: new Date(0),
    };

    res.clearCookie('token', cookieOptions).status(200).json({ success: true, message: 'logged out' });
  } catch (error) {
    next(error);
  }
};
