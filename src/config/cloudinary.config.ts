import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { EnvConfig } from '@/config';

cloudinary.config({
  cloud_name: EnvConfig.CLOUDINARY_CLOUD_NAME,
  api_key: EnvConfig.CLOUDINARY_API_KEY,
  api_secret: EnvConfig.CLOUDINARY_API_SECRET,
});

export { cloudinary, UploadApiResponse };
