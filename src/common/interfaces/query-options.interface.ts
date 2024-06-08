export enum OrderEnum {
  asc = 'asc',
  desc = 'desc',
}
export type Order = 'asc' | 'desc';

export interface QueryOptions {
  offset?: number;
  limit?: number;
  order?: Order;
  attr?: string;
  value?: string;
}

export interface Query {
  skip?: number;
  take?: number;
  orderBy: { createdAt: Order };
  where:
    | { [x: string]: boolean }
    | { [x: string]: { contains: string; mode: string } }
    | { [x: string]: { gte: number } };
}
