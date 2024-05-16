import { Product } from '@/products/models';

export const calculateProductPrice = (product: Product) => {
  const discount = product.discount ? product.discount.amount : 0;
  const tax = parseFloat((product.tax * 0.01).toFixed(3));
  const priceWithDiscount = product.price - product.price * discount;
  return parseFloat((priceWithDiscount + priceWithDiscount * tax).toFixed(2));
};
