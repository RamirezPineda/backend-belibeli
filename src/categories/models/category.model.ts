import { QueryOptions } from '@/common/interfaces';

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  imageUrl: string;
}

export interface BestSellersByCategory {
  categoryId: string;
  categoryName: string;
  quantity: string;
}

export interface CategoryQueryOptions extends QueryOptions {
  withProducts?: boolean;
}

export interface CategoryInclude {
  product: {
    include: {
      productImage: boolean;
      discount: boolean;
      package: boolean;
      category: boolean;
    };
  };
}
