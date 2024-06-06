import type { Category } from '@/categories/models/category.model';
import type { Discount } from '@/discounts/models/discount.model';
import { Package } from '@/packages/models/package.model';
import type { ProductImage } from '@/products/models';

export enum DepartmentEnum {
  MEN = 'MEN',
  WOMAN = 'WOMAN',
}
export type Department = 'MEN' | 'WOMAN';

export interface Product {
  id: string;
  brand: string;
  creationDate: Date;
  department: Department;
  description: string;
  name: string;
  price: number;
  sizes: string[];
  specification: string;
  stock: number;
  tax: number;
  categoryId: string;
  discountId?: string | null;
  packageId: string;
  productImage?: ProductImage[];
  discount?: Discount | null;
  package?: Package | null;
  category?: Category | null;
}
