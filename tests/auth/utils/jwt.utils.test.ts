import { JsonWebTokenError } from 'jsonwebtoken';

import { JsonWebToken } from '@/auth/utils';
import type { User } from '@/users/models/user.model';

describe('Test jwt.utils', () => {
  const user: User = {
    id: 'abc123',
    email: 'jhon@gmail.com',
    name: 'jhon doe',
    password: '12345678',
    role: 'CUSTOMER',
    isActive: true,
  };

  test('Should convert the data sent to payload', () => {
    const payloadData = JsonWebToken.convertToPayload(user);
    expect(payloadData).toEqual({
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'jhon doe',
      role: 'CUSTOMER',
      isActive: true,
    });
  });

  test('Should generate the token', async () => {
    const payloadData = JsonWebToken.convertToPayload(user);
    const token = await JsonWebToken.generateToken(payloadData);
    const tokenParts = token.split('.');

    expect(token).toBeTypeOf('string');
    expect(tokenParts.length).toEqual(3);
  });

  test('Should get payload data (user data)', () => {
    const userData = JsonWebToken.getPayloadData({
      ...user,
      iat: 123,
      exp: 123,
    });

    expect(userData).toEqual(user);
  });

  test('Should return error when sent a invalid token', async () => {
    const token = 'mytoken';

    await expect(JsonWebToken.verifyToken(token)).rejects.toThrow(
      JsonWebTokenError,
    );
  });
});
