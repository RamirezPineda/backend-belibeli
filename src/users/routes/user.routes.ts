import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { paramsDtoSchema, queryOptionsDtoSchema } from '@/common/dto';
import { schemaValidator } from '@/common/middlewares';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserService } from '@/users/services/user.service';
import { UserController } from '@/users/controllers/user.controller';
import {
  enableOrDisableDtoSchema,
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '@/users/dto';

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
    router.get(
      ENDPOINTS.USERS_ID,
      schemaValidator({ params: paramsDtoSchema }),
      userController.findById.bind(userController),
    );
    router.post(
      ENDPOINTS.USERS,
      schemaValidator({ body: userCreateDtoSchema }),
      userController.create.bind(userController),
    );
    router.patch(
      ENDPOINTS.USERS_ID,
      schemaValidator({ params: paramsDtoSchema, body: userUpdateDtoSchema }),
      userController.update.bind(userController),
    );
    router.post(
      ENDPOINTS.USERS_ID,
      schemaValidator({
        params: paramsDtoSchema,
        body: enableOrDisableDtoSchema,
      }),
      userController.enableOrDisable.bind(userController),
    );

    return router;
  }
}
