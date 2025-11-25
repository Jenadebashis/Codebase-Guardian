import multer from 'multer';
import path from 'path';

// Set up storage for uploaded files in memory
const storage = multer.memoryStorage();

// File filter to accept only certain file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.js', '.ts', '.json'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only .js, .ts, and .json are allowed.'), false);
  }
};

// Configure multer with size limits and file filter
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

export default upload;
