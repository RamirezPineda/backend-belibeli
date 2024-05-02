import { type UploadApiResponse } from 'cloudinary';

import { QueryOptions } from '@common/interfaces';
import { ResponseError, convertToQuery, deleteFile } from '@common/utils';
import { UploadFile } from '@common/utils/upload-file.utils';

import { ProductRepository } from '@/products/repositories/product.repository';
import type { Product } from '@/products/models';
import type { ProductCreateDto, ProductImageCreateDto } from '@/products/dto';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(queryOptions: QueryOptions): Promise<Product[]> {
    const query = convertToQuery(queryOptions);
    return this.productRepository.findAll(query);
  }

  async create(
    productCreateDto: ProductCreateDto,
    images: Express.Multer.File[],
  ) {
    const productImageCreateDto: ProductImageCreateDto[] = [];
    const promiseImages: Promise<UploadApiResponse>[] = [];
    const promiseDeleteImages: Promise<void>[] = [];

    for (const image of images) {
      promiseImages.push(UploadFile.upload(image.path));
    }

    const uploadedImages: UploadApiResponse[] =
      await Promise.all(promiseImages);

    for (const image of uploadedImages) {
      productImageCreateDto.push({ url: image.secure_url });
    }

    for (const image of images) {
      promiseDeleteImages.push(deleteFile(image.path));
    }

    await Promise.all(promiseDeleteImages);

    return this.productRepository.create(
      productCreateDto,
      productImageCreateDto,
    );
  }

  async findById(id: string) {
    const productFound = await this.productRepository.findById(id);

    if (!productFound) {
      throw new ResponseError({
        statusCode: 404,
        messages: ['Product not found'],
      });
    }

    return productFound;
  }
}
