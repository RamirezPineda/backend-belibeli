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
