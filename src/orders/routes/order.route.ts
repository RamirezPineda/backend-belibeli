import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator } from '@/common/middlewares';
import {
  idAndUserIdParamsDtoSchema,
  paramsDtoSchema,
  queryOptionsDtoSchema,
  userIdParamsDtoSchema,
} from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import { OrderRepository } from '@/orders/repositories/order.repository';
import { OrderService } from '@/orders/services/order.service';
import { OrderController } from '@/orders/controllers/order.controller';
import { orderCreateDtoSchema } from '@/orders/dto';

export class OrderRoute {
  static get routes() {
    const router = Router();

    const orderRepository = new OrderRepository();
    const orderService = new OrderService(orderRepository);
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
      authorization,
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

    router.get(
      ENDPOINTS.ORDERS_USER_ID,
      schemaValidator({
        params: userIdParamsDtoSchema,
        query: queryOptionsDtoSchema,
      }),
      orderController.findAllByUserId.bind(orderController),
    );
    router.get(
      ENDPOINTS.ORDERS_ID_USER_ID,
      schemaValidator({
        params: idAndUserIdParamsDtoSchema,
        query: queryOptionsDtoSchema,
      }),
      orderController.findByIdAndUserId.bind(orderController),
    );

    return router;
  }
}
