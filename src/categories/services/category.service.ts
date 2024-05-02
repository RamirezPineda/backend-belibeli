import { UploadFile, convertToQuery, deleteFile } from '@/common/utils';
import type { QueryOptions } from '@/common/interfaces';

import type { CategoryCreateDto } from '@/categories/dto';
import { CategoryRepository } from '@/categories/repositories/category.repository';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    return this.categoryRepository.findAll(query);
  }

  async create(
    categoryCreateDto: CategoryCreateDto,
    image: Express.Multer.File,
  ) {
    const { secure_url } = await UploadFile.upload(image.path, '/categories');
    await deleteFile(image.path);
    return this.categoryRepository.create(categoryCreateDto, secure_url);
  }
}
