import type { Product } from '@/products/models';

export interface ProductFavorite {
  id: string;
  date: Date;
  hour: Date;
  productId: string;
  userId: string;
  product: Product;
}
