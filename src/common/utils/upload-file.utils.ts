import { type UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { EnvConfig } from '@/config';

cloudinary.config({
  cloud_name: EnvConfig.CLOUDINARY_CLOUD_NAME,
  api_key: EnvConfig.CLOUDINARY_API_KEY,
  api_secret: EnvConfig.CLOUDINARY_API_SECRET,
});

export class UploadFile {
  static async upload(
    filePath: string,
    folder?: string,
  ): Promise<UploadApiResponse> {
    return cloudinary.uploader.upload(filePath, {
      folder: 'portfolio/ecommerce' + (folder ? `/${folder}` : ''),
      use_filename: true,
    });
  }
}
