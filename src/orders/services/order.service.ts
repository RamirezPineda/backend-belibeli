import type { QueryOptions } from '@/common/interfaces';
import { ResponseError, convertToQuery } from '@/common/utils';
import type { User } from '@/users/models/user.model';

import { OrderRepository } from '@/orders/repositories/order.repository';
import type { OrderCreateDto } from '@/orders/dto';

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    return this.orderRepository.findAll(query);
  }

  async findAllByUserId(queryOptions: QueryOptions, userId: string) {
    const query = convertToQuery(queryOptions);
    return this.orderRepository.findAllByUserId(query, userId);
  }

  async create(orderCreateDto: OrderCreateDto, user: Omit<User, 'password'>) {
    // todo: implementar la pasarela de pagos STRIPE
    return this.orderRepository.create(orderCreateDto, user.id);
  }

  async findById(id: string) {
    const orderFound = await this.orderRepository.findById(id);

    if (!orderFound) {
      throw new ResponseError({ messages: ['Order not found'] });
    }

    return orderFound;
  }

  async findByIdAndByUserId(id: string, userId: string) {
    const orderFound = await this.orderRepository.findByIdAndByUserId(
      id,
      userId,
    );

    if (!orderFound) {
      throw new ResponseError({ messages: ['Order not found'] });
    }

    return orderFound;
  }
}
