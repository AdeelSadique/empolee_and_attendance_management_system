import { userModel } from '../models/user.js';
import { attendanceModel } from '../models/attendance.js';
import { ErrorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import path from 'path';

export const userRegisteration = async (req, res, next) => {
  try {
    const { name, email, password, dob, gender, department, job, salary } = req.body;
    // generating unique id
    const str = `${department}10`;
    let userID = str
      .split('')
      .filter((val) => !val.includes(' '))
      .join('');
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

    if (!email || !password) {
      next(new ErrorHandler('Email and Password are Required', 400));
    } else {
      const user = await userModel.findOne({ email }).select('+password');
      if (user?.email != email || user?.password != password) {
        next(new ErrorHandler('Invalid Email or Password', 404));
      } else {
        // we will set the session
        const cookieOptions = {
          httpOnly: true,

          path: '/',
          sameSite: process.env.NODE === 'development' ? 'lax' : 'none',
          secure: process.env.NODE === 'development' ? false : true,
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
        };

        // now create the jwt token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

        res.cookie('token', token, cookieOptions).status(200).json({ success: true, message: 'Logged In', token });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user);

    res.status(200).json({ success: true, message: user });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res, next) => {
  try {
    // we will destroy the session
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: process.env.NODE === 'development' ? 'lax' : 'none',
      secure: process.env.NODE === 'development' ? false : true,
      expires: new Date(0),
    };

    res.clearCookie('token', cookieOptions).status(200).json({ success: true, message: 'Logged Out' });
  } catch (error) {
    next(error);
  }
};

// logic to getting attendance
export const getAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceModel.find();
    const totalAttendance = attendance.length;
    const attendee = [];
    const absent = [];

    for (let i = 0; i < attendance.length; i++) {
      const userID = attendance[i].user;
      const userAtt = attendance[i].attendance;

      const user = await userModel.findById(userID);

      if (userAtt.length == 0) {
        absent.push(user);
      } else {
        for (let j = 0; j < userAtt.length; j++) {
          const currentDate = Date().slice(0, 10);
          const attDate = userAtt[j].date.slice(0, 10);

          if (attDate == currentDate) {
            const image = userAtt[j].image;
            attendee.push({ user, image });
          } else {
            !absent.includes(user) ? absent.push(user) : '';
          }
        }
      }
    }
    res.status(200).json({ success: true, attendee, absent, totalAttendance });
  } catch (error) {
    next(error);
  }
};

// logic to getting all employees
export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await userModel.find();

    res.status(200).json({ success: true, employees });
  } catch (error) {
    next(error);
  }
};
