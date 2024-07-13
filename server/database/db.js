import mongoose from 'mongoose';

export const mongoDBConnection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, { dbName: 'emp_and_atte_man_sys' })
      .then((res) => {
        console.log(`MongoDB is connected with ${res.connection.host}`);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    throw error;
  }
};
