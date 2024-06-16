import { getDateMonths } from '@/common/utils';

import { ProductRepository } from '@/products/repositories';
import { ProductOrderRepository } from '@/analytics/repositories/product-order.repository';
import { UserRepository } from '@/users/repositories/user.repository';
import { CategoryRepository } from '@/categories/repositories/category.repository';

import { calculateProductPrice } from '@/orders/utils';
import { calculatePercentageDifferent } from '@/analytics/utils/calculate-percentage-different.utils';
import type { ProductOrder } from '@/orders/models/order.model';
import type { SalesOfTheYear } from '@/analytics/interfaces/analytic.interface';
import { MONTHS } from '@/analytics/constants/date.constants';

export class AnalyticService {
  constructor(
    private readonly productOrderRepository: ProductOrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async totalNewUsersInTheMonth() {
    const {
      firstDayCurrentMoth,
      lastDayCurrentMoth,
      firstDayLastMonth,
      lastDayLastMonth,
    } = getDateMonths();

    const numberUsersCurrentMonth =
      await this.userRepository.numberOfUsersInTheMonth(
        firstDayCurrentMoth.toISOString(),
        lastDayCurrentMoth.toISOString(),
      );

    const numberUsersPreviousMonth =
      await this.userRepository.numberOfUsersInTheMonth(
        firstDayLastMonth.toISOString(),
        lastDayLastMonth.toISOString(),
      );

    const percentageOfNewUsers = calculatePercentageDifferent(
      numberUsersCurrentMonth,
      numberUsersPreviousMonth,
    );

    return { numberUsersCurrentMonth, percentageOfNewUsers };
  }

  async totalSaleOfTheMonth() {
    const {
      firstDayCurrentMoth,
      lastDayCurrentMoth,
      firstDayLastMonth,
      lastDayLastMonth,
    } = getDateMonths();

    const productsOrderCurrentMoth = await this.productOrderRepository.findAll({
      firstDate: firstDayCurrentMoth.toISOString(),
      lastDate: lastDayCurrentMoth.toISOString(),
    });
    const productsOrderPreviousMoth = await this.productOrderRepository.findAll(
      {
        firstDate: firstDayLastMonth.toISOString(),
        lastDate: lastDayLastMonth.toISOString(),
      },
    );

    const totalCurrentMonth = await this.totalSaleMonth(
      productsOrderCurrentMoth,
    );
    const totalPreviousMonth = await this.totalSaleMonth(
      productsOrderPreviousMoth,
    );

    const percentageOfSales = calculatePercentageDifferent(
      totalCurrentMonth,
      totalPreviousMonth,
    );

    return { totalCurrentMonth, percentageOfSales };
  }

  async bestSellingProduct() {
    const bestSelling = await this.productOrderRepository.bestSellingProduct();

    if (bestSelling.length > 0) {
      const bestSellingProduct = bestSelling[0];
      const product = await this.productRepository.findById(
        bestSellingProduct.productId,
      );

      const {
        firstDayCurrentMoth,
        lastDayCurrentMoth,
        firstDayLastMonth,
        lastDayLastMonth,
      } = getDateMonths();

      const currentMonthAmount =
        await this.productOrderRepository.salesOfTheMonth({
          productId: bestSellingProduct.productId,
          firstDate: firstDayCurrentMoth.toISOString(),
          lastDate: lastDayCurrentMoth.toISOString(),
        });

      const amountFromThePreviousMonth =
        await this.productOrderRepository.salesOfTheMonth({
          productId: bestSellingProduct.productId,
          firstDate: firstDayLastMonth.toISOString(),
          lastDate: lastDayLastMonth.toISOString(),
        });

      const currentSales = currentMonthAmount._sum.quantity ?? 0;
      const previousSales = amountFromThePreviousMonth._sum.quantity ?? 0;
      const percentageOfSales = calculatePercentageDifferent(
        currentSales,
        previousSales,
      );

      return {
        product,
        quantitySold: bestSellingProduct.quantity,
        percentageOfSales,
      };
    }

    return { product: undefined, quantitySold: 0, percentageOfSales: 0 };
  }

  async salesOfTheYear() {
    const sales: SalesOfTheYear[] = [];

    const currentYear = new Date().getFullYear();

    for (let month = 0; month < MONTHS.length; month++) {
      const firstDate = new Date(currentYear, month, 1);
      const lastDate = new Date(currentYear, month + 1, 0);

      const productsOrders = await this.productOrderRepository.findAll({
        firstDate: firstDate.toISOString(),
        lastDate: lastDate.toISOString(),
      });

      const totalSaleMonth = await this.totalSaleMonth(productsOrders);
      sales.push({ month: MONTHS[month], totalSale: totalSaleMonth });
    }

    return sales;
  }

  private async totalSaleMonth(productsOrder: Omit<ProductOrder, 'product'>[]) {
    let total = 0;
    for await (const productOrder of productsOrder) {
      const { productId, quantity } = productOrder;
      const product = await this.productRepository.findById(productId);
      total += Number((calculateProductPrice(product!) * quantity).toFixed(2));
    }
    return Number(total.toFixed(2));
  }

  async bestSellersByCategoryAnalytics() {
    const mostSelledCategories = await this.categoryRepository.bestSellers();
    const bestSellersByCategory = mostSelledCategories.map(
      ({ categoryName, quantity }) => ({ categoryName, quantity }),
    );

    return bestSellersByCategory;
  }
}
