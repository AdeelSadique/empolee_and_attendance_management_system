import multer from 'multer';
import path from 'path';

// export const imageUploader = () => {
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/attendance_images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const imageUploader = multer({ storage: storage }).single('image');
// };
export { imageUploader };
