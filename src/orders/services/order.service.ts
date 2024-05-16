import type { QueryOptions } from '@/common/interfaces';
import { ResponseError, convertToQuery } from '@/common/utils';
import type { User } from '@/users/models/user.model';

import { OrderRepository } from '@/orders/repositories/order.repository';
import { ProductRepository } from '@/products/repositories/product.repository';
import type { OrderCreateDto, ProductOrderCreateDto } from '@/orders/dto';
import { StripePayment, calculateProductPrice } from '@/orders/utils';

export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    return this.orderRepository.findAll(query);
  }

  async findAllByUserId(queryOptions: QueryOptions, userId: string) {
    const query = convertToQuery(queryOptions);
    return this.orderRepository.findAllByUserId(query, userId);
  }

  async create(orderCreateDto: OrderCreateDto, user: Omit<User, 'password'>) {
    const { confirmationTokenId, ...restOrderCreateDto } = orderCreateDto;

    const amount = await this.calculateAmount(restOrderCreateDto.productOrder);

    let paymentIntentId = '';

    try {
      const { id } = await StripePayment.createPaymentIntents({
        amount,
        confirmationTokenId,
      });
      paymentIntentId = id;

      return this.orderRepository.create(restOrderCreateDto, user.id);
    } catch (error) {
      if (paymentIntentId !== '') {
        await StripePayment.refund({ paymentIntentId, amount });
      }

      throw new ResponseError({
        messages: [
          'Lo siento, no se pudo procesar la orden de compra en este momento debido a problemas técnicos. Por favor, inténtelo de nuevo más tarde.',
        ],
      });
    }
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

  private async calculateAmount(createProductOrders: ProductOrderCreateDto) {
    let amount = 0.0;

    const calculateTotalPromise = createProductOrders.map(
      async (productOrder) => {
        const productFound = await this.productRepository.findById(
          productOrder.productId,
        );

        if (!productFound) {
          throw new ResponseError({
            statusCode: 404,
            messages: ['Product not found'],
          });
        }

        const productPrice = calculateProductPrice(productFound);
        amount += productPrice * productOrder.quantity;
      },
    );

    await Promise.all(calculateTotalPromise);

    return parseFloat(amount.toFixed(2));
  }
}
