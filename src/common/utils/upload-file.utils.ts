import { cloudinary, type UploadApiResponse } from '@/config';

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
