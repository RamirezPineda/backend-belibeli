import { Request, Response } from 'express';

import { handlerErrors } from '@/common/utils';
import type { ResponseApi } from '@common/interfaces';

import { AnalyticService } from '@/analytics/services/analitytic.service';

export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  async totalNewUsersInTheMonth(req: Request, res: Response) {
    try {
      const totalNewUsersInTheMonth =
        await this.analyticService.totalNewUsersInTheMonth();
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: totalNewUsersInTheMonth,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async totalSaleOfTheMonth(req: Request, res: Response) {
    try {
      const totalSaleOfTheMonth =
        await this.analyticService.totalSaleOfTheMonth();
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: totalSaleOfTheMonth,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async bestSellingProductAnalytic(req: Request, res: Response) {
    try {
      const bestSellingProduct =
        await this.analyticService.bestSellingProduct();
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: bestSellingProduct,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async salesOfTheYear(req: Request, res: Response) {
    try {
      const salesOfTheYear = await this.analyticService.salesOfTheYear();
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: salesOfTheYear,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async bestSellersByCategoryAnalytics(req: Request, res: Response) {
    try {
      const bestSellersByCategory =
        await this.analyticService.bestSellersByCategoryAnalytics();
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: bestSellersByCategory,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
