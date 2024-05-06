import type { Request, Response } from 'express';

import { handlerErrors } from '@/common/utils';
import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { PackageService } from '@/packages/services/package.service';
import type { PackageCreateDto, PackageUpdateDto } from '@/packages/dto';

export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const packages = await this.packageService.findAll(queryOptions);
      const responseApi: ResponseApi = { statusCode: 200, data: packages };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const packageCreateDto: PackageCreateDto = req.body.data;
      const packageCreated = await this.packageService.create(packageCreateDto);
      const responseApi: ResponseApi = {
        statusCode: 201,
        data: packageCreated,
      };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const packageFound = await this.packageService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: packageFound };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const packageUpdateDto: PackageUpdateDto = req.body.data;

      const packageUpdated = await this.packageService.update(
        id,
        packageUpdateDto,
      );
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: packageUpdated,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const packageDeleted = await this.packageService.delete(id);
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: packageDeleted,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
