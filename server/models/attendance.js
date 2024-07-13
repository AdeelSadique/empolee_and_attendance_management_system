import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  // images: [],
  attendance: { type: Array },
});

export const attendanceModel = mongoose.model('attendances', attendanceSchema);
