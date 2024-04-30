import { Router } from 'express';

import { ENDPOINTS } from '@common/constants';
import { schemaValidator } from '@common/middlewares';

import { AuthController } from '@/auth/controllers/auth.controller';
import { AuthService } from '@/auth/services/auth.service';
import { loginDtoSchema } from '@/auth/dto/login.dto';

import { UserRepository } from '@/users/repositories/user.repository';
import { userCreateDtoSchema } from '@/users/dto';

export class AuthRoutes {
  static get routes() {
    const router = Router();

    const userRepository = new UserRepository();
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    router.post(
      ENDPOINTS.AUTH_REGISTER,
      schemaValidator({ body: userCreateDtoSchema }),
      authController.register.bind(authController),
    );
    router.post(
      ENDPOINTS.AUTH_LOGIN,
      schemaValidator({ body: loginDtoSchema }),
      authController.login.bind(authController),
    );

    return router;
  }
}
