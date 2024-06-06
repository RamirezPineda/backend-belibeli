import type { QueryOptions } from '@/common/interfaces';
import {
  ResponseError,
  convertToQuery,
  removeValuesUndefined,
} from '@/common/utils';

import { DiscountRepository } from '@/discounts/repositories/discount.repository';
import type { DiscountCreateDto, DiscountUpdateDto } from '@/discounts/dto';

export class DiscountService {
  constructor(private readonly discountRepository: DiscountRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const discounts = await this.discountRepository.findAll(query);
    const countData = await this.discountRepository.countData(query);
    return { data: discounts, countData };
  }

  async create(discountCreateDto: DiscountCreateDto) {
    return this.discountRepository.create(discountCreateDto);
  }

  async findById(id: string) {
    const discountFound = await this.discountRepository.findById(id);

    if (!discountFound) {
      throw new ResponseError({ messages: ['Discount not found'] });
    }

    return discountFound;
  }

  async update(id: string, discountUpdateDto: DiscountUpdateDto) {
    await this.findById(id);
    const data = removeValuesUndefined(discountUpdateDto);
    return this.discountRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.discountRepository.delete(id);
  }
}
