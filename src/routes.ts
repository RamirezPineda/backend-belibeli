import { Router } from 'express';

import { ENDPOINTS } from '@common/constants';
import { SeedRoutes } from '@/seed/routes/seed.router';
import { AuthRoutes } from '@/auth/routes/auth.routes';
import { UserRoutes } from '@/users/routes/user.routes';
import { CategoryRoutes } from '@/categories/routes/category.routes';
import { PackageRoutes } from '@/packages/routes/package.routes';
import { ProductRoutes, ProductFavoriteRoutes } from '@/products/routes';
import { DiscountRoute } from '@/discounts/routes/discount.route';
import { OrderRoute } from '@/orders/routes/order.route';
import { NotificationRoute } from '@/notifications/routes/notification.route';

export class Routes {
  public static get routes(): Router {
    const router = Router();

    // path to check server status
    router.get(ENDPOINTS.HEALTH, (_, res) => res.status(200).json());

    router.use(SeedRoutes.routes);
    router.use(AuthRoutes.routes);
    router.use(UserRoutes.routes);
    router.use(CategoryRoutes.routes);
    router.use(PackageRoutes.routes);
    router.use(PackageRoutes.routes);
    router.use(ProductRoutes.routes);
    router.use(ProductFavoriteRoutes.routes);
    router.use(DiscountRoute.routes);
    router.use(OrderRoute.routes);
    router.use(NotificationRoute.routes);

    return router;
  }
}
