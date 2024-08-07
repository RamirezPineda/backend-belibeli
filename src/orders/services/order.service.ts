import { socket } from '@/main';

import {
  ADMIN_NOTIFICATION_EVENT,
  USER_NOTIFICATION_EVENT,
} from '@/common/constants';
import type { QueryOptions } from '@/common/interfaces';
import { ResponseError, convertToQuery } from '@/common/utils';

import { StripePayment, calculateProductPrice } from '@/orders/utils';
import { OrderRepository } from '@/orders/repositories/order.repository';
import { ProductRepository } from '@/products/repositories/product.repository';
import { NotificationRepository } from '@/notifications/repositories/notification.repository';
import type {
  OrderCreateDto,
  OrderCreatePaymentDto,
  ProductOrderCreateDto,
} from '@/orders/dto';
import type { User } from '@/users/models/user.model';
import type {
  CreateNotification,
  Notification,
} from '@/notifications/models/notification.model';

export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const orders = await this.orderRepository.findAll(query);
    const countData = await this.orderRepository.countData(query);
    return { data: orders, countData };
  }

  async findAllByUserId(queryOptions: QueryOptions, userId: string) {
    const query = convertToQuery(queryOptions);
    const orders = await this.orderRepository.findAllByUserId(query, userId);
    const countData = await this.orderRepository.countDataByUser(query, userId);
    return { data: orders, countData };
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

      const newOrder = await this.orderRepository.create(
        restOrderCreateDto,
        user.id,
      );

      this.sendNotification(newOrder.id, user.name);

      return newOrder;
    } catch (error) {
      if (paymentIntentId !== '') {
        await StripePayment.refund({ paymentIntentId, amount });
      }

      throw new ResponseError({
        messages: [
          'Sorry, the purchase order could not be processed at this time due to technical issues. Please try again later.',
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

  async createPayment(orderCreateDto: OrderCreatePaymentDto) {
    const amount = await this.calculateAmount(orderCreateDto.productOrder);

    try {
      return await StripePayment.createPaymentIntents({ amount });
    } catch (error) {
      throw new ResponseError({
        messages: [
          'Sorry, the purchase order could not be processed at this time due to technical issues. Please try again later.',
        ],
      });
    }
  }

  async createOrderPayment(orderCreateDto: OrderCreatePaymentDto, user: Omit<User, 'password'>) {
    const newOrder = await this.orderRepository.create(
      orderCreateDto,
      user.id,
    );

    this.sendNotification(newOrder.id, user.name);
    return newOrder;
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

  private sendNotification(orderId: string, userName: string) {
    const newNotification: CreateNotification = {
      title: 'Thank you for your purchase at BeliBeli.com!',
      description: `Your purchase is on the way ${userName}! We are pleased to inform you that your order has been successfully processed and is in the shipping process. Thanks for trusting us!`,
      orderId,
    };
    const adminNotification: CreateNotification = {
      title: 'New purchase order at BeliBeli.com!',
      description: `A new purchase order has been placed on BeliBeli.com by user ${userName}. Please check the admin panel for more details.`,
      orderId,
      private: true,
    };
    this.notificationRepository
      .create(newNotification)
      .then((data: Notification) => {
        socket?.emit(USER_NOTIFICATION_EVENT, data);
      })
      .catch();
    this.notificationRepository
      .create(adminNotification)
      .then((data: Notification) => {
        socket?.emit(ADMIN_NOTIFICATION_EVENT, data);
      })
      .catch();
  }
}
