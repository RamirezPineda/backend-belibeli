import type { Request, Response } from 'express';

import { handlerErrors } from '@/common/utils';
import type { ResponseApi } from '@common/interfaces';

import { SeedService } from '@/seed/services/seed.service';

export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  async seed(req: Request, res: Response) {
    try {
      await this.seedService.seed();
      const responseApi: ResponseApi = {
        statusCode: 201,
        data: 'Executed seeder',
      };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
