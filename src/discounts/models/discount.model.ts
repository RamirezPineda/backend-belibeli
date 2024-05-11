import type { Product } from '@/products/models';

export interface Discount {
  id: string;
  amount: number;
  name: string;
  product?: Product[];
}
