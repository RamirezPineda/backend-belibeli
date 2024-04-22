import { Router } from 'express';
import { ENDPOINTS } from '@common/constants';

export class Routes {
  public static get routes(): Router {
    const router = Router();

    // path to check server status
    router.get(ENDPOINTS.HEALTH, (_, res) => res.status(200).json());

    return router;
  }
}
