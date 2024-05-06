import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';
import { PackageCreateDto, PackageUpdateDto } from '@/packages/dto';
import type { Package } from '@/packages/models/package.model';

export class PackageRepository {
  async findAll(query: Query): Promise<Package[]> {
    return prisma.package.findMany(query);
  }

  async createPackage(packageCreateDto: PackageCreateDto): Promise<Package> {
    return prisma.package.create({ data: { ...packageCreateDto } });
  }

  async findById(id: string): Promise<Package | null> {
    return prisma.package.findUnique({ where: { id } });
  }

  async update(
    id: string,
    packageUpdateDto: PackageUpdateDto,
  ): Promise<Package> {
    return prisma.package.update({
      where: { id },
      data: { ...packageUpdateDto },
    });
  }

  async delete(id: string): Promise<Package> {
    return prisma.package.delete({ where: { id } });
  }
}
