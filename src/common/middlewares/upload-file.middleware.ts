import multer from 'multer';

const limits = { fileSize: 1000 * 1000 * 4 }; // 4MB
export const upload = multer({ dest: 'uploads/', limits });
