import { Router } from 'express';

import { ENDPOINTS } from '@/common/constants';
import { schemaValidator } from '@/common/middlewares';
import {
  paramsDtoSchema,
  paramsNameDtoSchema,
  queryOptionsDtoSchema,
} from '@/common/dto';
import { authentication, authorization } from '@/auth/middlewares';

import { DiscountRepository } from '@/discounts/repositories/discount.repository';
import { DiscountService } from '@/discounts/services/discount.service';
import { DiscuntController } from '@/discounts/controllers/discount.controller';
import {
  discountCreateDtoSchema,
  discountUpdateDtoSchema,
} from '@/discounts/dto';

export class DiscountRoute {
  static get routes() {
    const router = Router();

    const discountRepository = new DiscountRepository();
    const discountService = new DiscountService(discountRepository);
    const discuntController = new DiscuntController(discountService);

    router.get(
      ENDPOINTS.DISCOUNTS,
      schemaValidator({ query: queryOptionsDtoSchema }),
      discuntController.findAll.bind(discuntController),
    );
    router.post(
      ENDPOINTS.DISCOUNTS,
      authentication,
      authorization,
      schemaValidator({ body: discountCreateDtoSchema }),
      discuntController.create.bind(discuntController),
    );
    router.get(
      ENDPOINTS.DISCOUNTS_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      discuntController.findById.bind(discuntController),
    );
    router.patch(
      ENDPOINTS.DISCOUNTS_ID,
      authentication,
      authorization,
      schemaValidator({
        params: paramsDtoSchema,
        body: discountUpdateDtoSchema,
      }),
      discuntController.update.bind(discuntController),
    );
    router.delete(
      ENDPOINTS.DISCOUNTS_ID,
      authentication,
      authorization,
      schemaValidator({ params: paramsDtoSchema }),
      discuntController.delete.bind(discuntController),
    );

    router.get(
      ENDPOINTS.DISCOUNTS_BY_NAME,
      schemaValidator({ params: paramsNameDtoSchema }),
      discuntController.findByName.bind(discuntController),
    );

    return router;
  }
}
