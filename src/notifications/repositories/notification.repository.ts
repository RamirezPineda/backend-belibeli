import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import type {
  CreateNotification,
  Notification,
} from '@/notifications/models/notification.model';

export class NotificationRepository {
  async findAllPrivates(query: Query): Promise<Notification[]> {
    return prisma.notification.findMany({
      ...query,
      where: { ...query.where, private: true },
      orderBy: [{ read: 'asc' }, { createdAt: query.orderBy.createdAt }],
    });
  }

  async countData(query: Query, userId?: string): Promise<number> {
    return prisma.notification.count({
      where: {
        ...query.where,
        private: !userId ? true : false,
        order: { userId },
      },
    });
  }

  async findAllByUserId(query: Query, userId: string): Promise<Notification[]> {
    return prisma.notification.findMany({
      ...query,
      where: { ...query.where, private: false, order: { userId } },
      orderBy: [{ read: 'asc' }, { createdAt: query.orderBy.createdAt }],
    });
  }

  async findById(id: string): Promise<Notification | null> {
    return prisma.notification.findUnique({ where: { id } });
  }

  async create(data: CreateNotification): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  async update(id: string): Promise<Notification> {
    return prisma.notification.update({ where: { id }, data: { read: true } });
  }
}
