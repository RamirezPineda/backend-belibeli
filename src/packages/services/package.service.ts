import {
  ResponseError,
  convertToQuery,
  removeValuesUndefined,
} from '@/common/utils';
import type { QueryOptions } from '@/common/interfaces';

import { PackageRepository } from '@/packages/repositories/package.repository';
import { PackageCreateDto, PackageUpdateDto } from '@/packages/dto';

export class PackageService {
  constructor(private readonly packageReposiory: PackageRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const packages = await this.packageReposiory.findAll(query);
    const countData = await this.packageReposiory.countData(query);
    return { data: packages, countData };
  }

  async create(packageCreateDto: PackageCreateDto) {
    return this.packageReposiory.createPackage(packageCreateDto);
  }

  async findById(id: string) {
    const packageFound = await this.packageReposiory.findById(id);

    if (!packageFound) {
      throw new ResponseError({ messages: ['Package not found'] });
    }

    return packageFound;
  }

  async update(id: string, packageUpdateDto: PackageUpdateDto) {
    const packageFound = await this.findById(id);
    const data = removeValuesUndefined(packageUpdateDto);
    return this.packageReposiory.update(packageFound.id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.packageReposiory.delete(id);
  }
}
