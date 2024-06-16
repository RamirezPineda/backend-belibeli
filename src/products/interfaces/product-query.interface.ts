import type { QueryOptions } from '@/common/interfaces';

export interface ProductQueryOptions extends QueryOptions {
  categoryId?: string;
}

export interface BestSellersByProduct {
  productId: string;
  quantity: string;
}
