import type { QueryOptions } from '@/common/interfaces';
import { ResponseError, convertToQuery } from '@/common/utils';

import { NotificationRepository } from '@/notifications/repositories/notification.repository';

export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findAllPrivates(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const notifications =
      await this.notificationRepository.findAllPrivates(query);
    const countData = await this.notificationRepository.countData(query);
    return { data: notifications, countData };
  }

  async findAllByUserId(queryOptions: QueryOptions, userId: string) {
    const query = convertToQuery(queryOptions);
    const notifications = await this.notificationRepository.findAllByUserId(
      query,
      userId,
    );
    const countData = await this.notificationRepository.countData(
      query,
      userId,
    );
    return { data: notifications, countData };
  }

  private async findById(id: string) {
    const notificationFound = await this.notificationRepository.findById(id);

    if (!notificationFound) {
      throw new ResponseError({ messages: ['Notification not found'] });
    }

    return notificationFound;
  }

  async update(id: string) {
    await this.findById(id);
    return this.notificationRepository.update(id);
  }
}
