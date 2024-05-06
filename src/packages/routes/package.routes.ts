import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator } from '@/common/middlewares';
import { paramsDtoSchema, queryOptionsDtoSchema } from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import { PackageRepository } from '@/packages/repositories/package.repository';
import { PackageService } from '@/packages/services/package.service';
import { PackageController } from '@/packages/controllers/package.controller';
import { packageCreateDtoSchema, packageUpdateDtoSchema } from '@/packages/dto';

export class PackageRoutes {
  static get routes() {
    const router = Router();

    const packageRepository = new PackageRepository();
    const packageService = new PackageService(packageRepository);
    const packageController = new PackageController(packageService);

    router.get(
      ENDPOINTS.PACKAGES,
      authentication,
      authorization,
      schemaValidator({ query: queryOptionsDtoSchema }),
      packageController.findAll.bind(packageController),
    );
    router.post(
      ENDPOINTS.PACKAGES,
      authentication,
      authorization,
      schemaValidator({ body: packageCreateDtoSchema }),
      packageController.create.bind(packageController),
    );
    router.get(
      ENDPOINTS.PACKAGES_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      packageController.findById.bind(packageController),
    );
    router.patch(
      ENDPOINTS.PACKAGES_ID,
      authentication,
      authorization,
      schemaValidator({
        params: paramsDtoSchema,
        body: packageUpdateDtoSchema,
      }),
      packageController.update.bind(packageController),
    );
    router.delete(
      ENDPOINTS.PACKAGES_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      packageController.delete.bind(packageController),
    );

    return router;
  }
}
