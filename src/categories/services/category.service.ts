import {
  ResponseError,
  UploadFile,
  convertToQuery,
  deleteFile,
  removeValuesUndefined,
} from '@/common/utils';
import type { QueryOptions } from '@/common/interfaces';

import type { CategoryCreateDto, CategoryUpdateDto } from '@/categories/dto';
import { CategoryRepository } from '@/categories/repositories/category.repository';
import {
  Category,
  CategoryQueryOptions,
} from '@/categories/models/category.model';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(queryOptions: CategoryQueryOptions) {
    const { withProducts, ...restQuery } = queryOptions;
    const query = convertToQuery(restQuery);
    const include = withProducts
      ? {
          product: {
            include: { productImage: true, discount: true, package: true, category: true },
          },
        }
      : undefined;
    const categories = await this.categoryRepository.findAll(query, include);
    const countData = await this.categoryRepository.countData(query);
    return { data: categories, countData };
  }

  async create(
    categoryCreateDto: CategoryCreateDto,
    image: Express.Multer.File,
  ) {
    const { secure_url } = await UploadFile.upload(image.path, '/categories');
    await deleteFile(image.path);
    return this.categoryRepository.create(categoryCreateDto, secure_url);
  }

  async findById(id: string) {
    const categoryFound = await this.categoryRepository.findById(id);

    if (!categoryFound) {
      throw new ResponseError({ messages: ['Category not found'] });
    }

    return categoryFound;
  }

  async update(
    id: string,
    categoryUpdateDto: CategoryUpdateDto,
    image: Express.Multer.File | undefined,
  ) {
    const categoryFound = await this.findById(id);

    if (image) {
      const { secure_url } = await UploadFile.upload(image.path, '/categories');
      await deleteFile(image.path);
      categoryUpdateDto.imageUrl = secure_url;
    }

    const data = removeValuesUndefined(categoryUpdateDto);

    return this.categoryRepository.update(categoryFound.id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.categoryRepository.delete(id);
  }

  async bestSellers(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const mostSelledCategories =
      await this.categoryRepository.bestSellers(query);

    const categories: Category[] = [];
    for await (const element of mostSelledCategories) {
      const category = await this.findById(element.categoryId);
      categories.push(category);
    }

    return categories;
  }
}
