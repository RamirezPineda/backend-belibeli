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
}
