import { OrderEnum, type Query, type QueryOptions } from '@common/interfaces';

export const convertToQuery = (queryOptions: QueryOptions): Query => {
  const { offset, limit, attr, value, order } = queryOptions;

  const pagination = { skip: offset, take: limit };
  const orderBy = order ? { createdAt: order } : { createdAt: OrderEnum.desc };

  let where = {};
  if (attr && value) {
    if (typeof value == 'boolean') {
      where = { [attr]: value };
    } else if (attr === 'date') {
      where = { [attr]: { equals: new Date(value) } };
    } else {
      where = { [attr]: { contains: value, mode: 'insensitive' } };
    }
  }

  const query = { ...pagination, orderBy, where };
  return query;
};
