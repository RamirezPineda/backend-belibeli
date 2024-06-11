import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator } from '@/common/middlewares';
import { paramsDtoSchema, queryOptionsDtoSchema } from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import { NotificationRepository } from '@/notifications/repositories/notification.repository';
import { NotificationService } from '@/notifications/services/notification.service';
import { NotificationController } from '@/notifications/controllers/notification.controller';

export class NotificationRoute {
  static get routes() {
    const router = Router();

    const notificationRepository = new NotificationRepository();
    const notificationService = new NotificationService(notificationRepository);
    const notificationController = new NotificationController(
      notificationService,
    );

    router.get(
      ENDPOINTS.NOTIFICATIONS,
      authentication,
      authorization,
      schemaValidator({ query: queryOptionsDtoSchema }),
      notificationController.findAllPrivates.bind(notificationController),
    );
    router.patch(
      ENDPOINTS.NOTIFICATIONS_ID,
      authentication,
      schemaValidator({ params: paramsDtoSchema }),
      notificationController.update.bind(notificationController),
    );

    router.get(
      ENDPOINTS.NOTIFICATIONS_USERS,
      authentication,
      schemaValidator({ query: queryOptionsDtoSchema }),
      notificationController.findAllByUserId.bind(notificationController),
    );

    return router;
  }
}
