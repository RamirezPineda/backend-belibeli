import type { QueryOptions } from '@/common/interfaces';

export interface ProductQueryOptions extends QueryOptions {
  categoryId?: string;
}
