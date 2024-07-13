import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  password: { type: String, select: false },
  userID: { type: String, unique: true },
  user: { type: Boolean, default: 0 },
  status: { isActive: { type: Boolean, default: 1 }, reason: { type: Array, default: 'new user' } },
  avatar: { publicId: String, url: String },
  dob: { type: String, required: [true, 'DOB is required'] },
  gender: { type: String, required: [true, 'Gender is required'] },
  department: { type: String, required: [true, 'Department is required'] },
  job: { type: String, required: [true, 'Job is required'] },
  salary: { type: Number, required: [true, 'Salary is required'] },
  joiningDate: { type: Date, default: Date.now },
});

export const userModel = mongoose.model('users', userSchema);
