import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator } from '@/common/middlewares';
import { paramsDtoSchema, queryOptionsDtoSchema } from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import { OrderRepository } from '@/orders/repositories/order.repository';
import { ProductRepository } from '@/products/repositories/product.repository';
import { NotificationRepository } from '@/notifications/repositories/notification.repository';
import { OrderService } from '@/orders/services/order.service';
import { OrderController } from '@/orders/controllers/order.controller';
import {
  orderCreateDtoSchema,
  orderCreatePaymentDtoSchema,
} from '@/orders/dto';

export class OrderRoute {
  static get routes() {
    const router = Router();

    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();
    const notificationRepository = new NotificationRepository();
    const orderService = new OrderService(
      orderRepository,
      productRepository,
      notificationRepository,
    );
    const orderController = new OrderController(orderService);

    router.get(
      ENDPOINTS.ORDERS,
      authentication,
      authorization,
      schemaValidator({ query: queryOptionsDtoSchema }),
      orderController.findAll.bind(orderController),
    );
    router.post(
      ENDPOINTS.ORDERS,
      authentication,
      schemaValidator({ body: orderCreateDtoSchema }),
      orderController.create.bind(orderController),
    );
    router.get(
      ENDPOINTS.ORDERS_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      orderController.findById.bind(orderController),
    );
    router.post(
      ENDPOINTS.CREATE_PAYMENT,
      authentication,
      schemaValidator({ body: orderCreatePaymentDtoSchema }),
      orderController.createPayment.bind(orderController),
    );
    router.post(
      ENDPOINTS.CREATE_ORDER_PAYMENT,
      authentication,
      schemaValidator({ body: orderCreatePaymentDtoSchema }),
      orderController.createOrderPayment.bind(orderController),
    );

    router.get(
      ENDPOINTS.ORDERS_USER,
      authentication,
      schemaValidator({ query: queryOptionsDtoSchema }),
      orderController.findAllByUserId.bind(orderController),
    );
    router.get(
      ENDPOINTS.ORDERS_USER_ID,
      authentication,
      schemaValidator({
        params: paramsDtoSchema,
        query: queryOptionsDtoSchema,
      }),
      orderController.findByIdAndUserId.bind(orderController),
    );

    return router;
  }
}
