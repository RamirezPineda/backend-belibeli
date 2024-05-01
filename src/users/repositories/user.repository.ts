import { prisma } from '@/common/database/conection.database';
import type { Query } from '@common/interfaces';

import type { User } from '@/users/models/user.model';
import type { UserCreateDto, UserUpdateDto } from '@/users/dto';

export class UserRepository {
  async findAll(query: Query): Promise<User[]> {
    return prisma.user.findMany(query);
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    return prisma.user.create({ data: { ...userCreateDto } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email, isActive: true } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id, isActive: true } });
  }

  async update(id: string, data: UserUpdateDto): Promise<User> {
    return prisma.user.update({ data, where: { id } });
  }

  async enableOrDisable(id: string, isActive: boolean): Promise<User> {
    return prisma.user.update({ data: { isActive }, where: { id } });
  }
}
