import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const multerOptions = {
  storage,
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error('Invalid file type'), false);
    }
    callback(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
};
