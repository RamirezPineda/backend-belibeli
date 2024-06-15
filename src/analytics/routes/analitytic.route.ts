import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { authentication, authorization } from '@/auth/middlewares';

import { AnalyticController } from '@/analytics/controllers/analitytic.controller';
import { AnalyticService } from '@/analytics/services/analitytic.service';
import { ProductOrderRepository } from '@/analytics/repositories/product-order.repository';
import { ProductRepository } from '@/products/repositories';
import { UserRepository } from '@/users/repositories/user.repository';

export class AnalyticRoute {
  static get routes() {
    const router = Router();

    const productOrderRepository = new ProductOrderRepository();
    const productRepository = new ProductRepository();
    const userRepository = new UserRepository();
    const analyticService = new AnalyticService(
      productOrderRepository,
      productRepository,
      userRepository,
    );
    const analyticController = new AnalyticController(analyticService);

    router.get(
      ENDPOINTS.ANALYTICS_TOTAL_USERS_OF_MONTH,
      authentication,
      authorization,
      analyticController.totalNewUsersInTheMonth.bind(analyticController),
    );
    router.get(
      ENDPOINTS.ANALYTICS_TOTAL_SALE_OF_MONTH,
      authentication,
      authorization,
      analyticController.totalSaleOfTheMonth.bind(analyticController),
    );
    router.get(
      ENDPOINTS.ANALYTICS_BEST_SELLING_PRODUCT,
      authentication,
      authorization,
      analyticController.bestSellingProductAnalytic.bind(analyticController),
    );

    router.get(
      ENDPOINTS.ANALYTICS_SALES_OF_THE_YEAR,
      authentication,
      authorization,
      analyticController.salesOfTheYear.bind(analyticController),
    );

    return router;
  }
}
