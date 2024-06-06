import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';

import { CategoryRepository } from '@/categories/repositories/category.repository';
import { UserRepository } from '@/users/repositories/user.repository';

import { SeedController } from '@/seed/controller/seed.controller';
import { SeedService } from '@/seed/services/seed.service';
import { PackageRepository } from '@/packages/repositories/package.repository';

export class SeedRoutes {
  static get routes() {
    const router = Router();

    const userRepository = new UserRepository();
    const categoryRepository = new CategoryRepository();
    const packageRepository = new PackageRepository();
    const seedService = new SeedService(
      userRepository,
      categoryRepository,
      packageRepository,
    );
    const seedController = new SeedController(seedService);

    router.get(ENDPOINTS.SEED, seedController.seed.bind(seedController));

    return router;
  }
}
