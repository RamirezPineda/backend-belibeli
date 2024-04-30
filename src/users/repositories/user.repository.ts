import { prisma } from '@/common/database/conection.database';

import type { User } from '@/users/models/user.model';
import { UserCreateDto } from '@/users/dto/user-create.dto';

export class UserRepository {
  async create(userCreateDto: UserCreateDto): Promise<User> {
    return prisma.user.create({ data: { ...userCreateDto } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email, isActive: true } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id, isActive: true } });
  }

  async enableOrDisable(id: string, isActive: boolean) {
    return prisma.user.update({ data: { isActive }, where: { id } });
  }
}
