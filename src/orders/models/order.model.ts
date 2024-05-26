import type { Product } from '@/products/models';
import type { User } from '@/users/models/user.model';

export interface ProductOrder {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
  product: Product;
}

export interface Order {
  id: string;
  code: string;
  date: Date;
  hour: Date;
  note: string;
  userId: string;
  user: User;
  productOrder: ProductOrder[];
}
