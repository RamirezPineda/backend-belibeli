import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { queryOptionsDtoSchema } from '@/common/dto';
import { schemaValidator } from '@/common/middlewares';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserService } from '@/users/services/user.service';
import { UserController } from '@/users/controllers/user.controller';

export class UserRoutes {
  static get routes() {
    const router = Router();

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    router.get(
      ENDPOINTS.USERS,
      schemaValidator({ query: queryOptionsDtoSchema }),
      userController.findAll.bind(userController),
    );

    return router;
  }
}
