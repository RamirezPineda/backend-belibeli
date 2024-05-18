export const PATH_PREFIX = '/api/v1';

export enum ENDPOINTS {
  HEALTH = '/health',
  AUTH_REGISTER = '/auth/register',
  AUTH_LOGIN = '/auth/login',
  USERS = '/users',
  USERS_ID = '/users/:id',
  CATEGORIES = '/categories',
  CATEGORIES_ID = '/categories/:id',
  PACKAGES = '/packages',
  PACKAGES_ID = '/packages/:id',
  PRODUCTS = '/products',
  PRODUCTS_ID = '/products/:id',
  DISCOUNTS = '/discounts',
  DISCOUNTS_ID = '/discounts/:id',
  ORDERS = '/orders',
  ORDERS_ID = '/orders/:id',
  ORDERS_USER_ID = '/orders/user/:userId',
  ORDERS_ID_USER_ID = '/orders/:id/user/:userId',
  SEED = '/seed',
}
