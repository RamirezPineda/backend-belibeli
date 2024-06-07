import {
  ResponseError,
  convertToQuery,
  deleteFile,
  excludeAttributes,
  removeValuesUndefined,
  UploadFile,
} from '@common/utils';

import {
  ProductRepository,
  ProductImageRepository,
} from '@/products/repositories';
import type {
  ProductCreateDto,
  ProductImageCreateDto,
  ProductUpdateDto,
} from '@/products/dto';
import type { ProductQueryOptions } from '@/products/interfaces/product-query.interface';

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async findAll(queryOptions: ProductQueryOptions) {
    const { categoryId, ...rest } = queryOptions;
    const query = convertToQuery(rest);
    const products = await this.productRepository.findAll(query, categoryId);
    const countData = await this.productRepository.countData(query);
    return { data: products, countData };
  }

  async create(
    productCreateDto: ProductCreateDto,
    images: Express.Multer.File[],
  ) {
    const promiseImages = images.map((image) =>
      UploadFile.upload(image.path, '/products'),
    );
    const uploadedImages = await Promise.all(promiseImages);

    const productImageCreateDto: ProductImageCreateDto[] = uploadedImages.map(
      (image) => ({ url: image.secure_url }),
    );

    const promiseDeleteImages = images.map((image) => deleteFile(image.path));
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

  async update(
    id: string,
    productUpdateDto: ProductUpdateDto,
    images: Express.Multer.File[],
  ) {
    const productFound = await this.findById(id);

    const productImageCreateDto: ProductImageCreateDto[] = [];

    if (images.length > 0) {
      const promiseImages = images.map((image) =>
        UploadFile.upload(image.path),
      );
      const uploadedImages = await Promise.all(promiseImages);

      for (const image of uploadedImages) {
        productImageCreateDto.push({ url: image.secure_url });
      }

      const promiseDeleteImages = images.map((image) => deleteFile(image.path));
      await Promise.all(promiseDeleteImages);
    }

    if (
      productUpdateDto.productImages.length !==
      productFound.productImage!.length
    ) {
      const productImagesToDelete = productFound.productImage!.filter(
        (productImage) =>
          !productUpdateDto.productImages.includes(productImage.id),
      );
      const imagesToDelete = productImagesToDelete.map((productImage) => ({
        id: productImage.id,
      }));

      await this.productImageRepository.deleteMany(imagesToDelete);
    }

    let data = removeValuesUndefined(productUpdateDto);
    data = excludeAttributes(data, ['productImages']);

    return this.productRepository.update(
      productFound.id,
      data,
      productImageCreateDto,
    );
  }

  async bestSeller(queryOptions: ProductQueryOptions) {
    const { categoryId, ...rest } = queryOptions;
    const query = convertToQuery(rest);
    const mostSelledProducts = await this.productRepository.bestSeller(
      query,
      categoryId,
    );

    const productsId = mostSelledProducts.map((item) => item.productId);
    return this.productRepository.findAllById(productsId);
  }
}
