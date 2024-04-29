export enum EnumRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}
export type Role = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
}
