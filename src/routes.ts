import { Router } from 'express';

import { ENDPOINTS } from '@common/constants';
import { AuthRoutes } from '@/auth/routes/auth.routes';
import { UserRoutes } from '@/users/routes/user.routes';

export class Routes {
  public static get routes(): Router {
    const router = Router();

    // path to check server status
    router.get(ENDPOINTS.HEALTH, (_, res) => res.status(200).json());

    router.use(AuthRoutes.routes);
    router.use(UserRoutes.routes);

    return router;
  }
}
