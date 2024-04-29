import request from 'supertest';

import { testServer } from '@tests/test-server';
import { ENDPOINTS, PATH_PREFIX } from '@/common/constants';
import type { ErrorInfo } from '@/common/interfaces';

const authRegisterUrl = PATH_PREFIX + ENDPOINTS.AUTH_REGISTER;
const authLoginUrl = PATH_PREFIX + ENDPOINTS.AUTH_LOGIN;

describe('Test auth.routes.ts', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  const responseError: ErrorInfo = {
    statusCode: 400,
    error: 'Bad Request',
    messages: [],
  };

  test(
    'Should show error messages for the data sent ' + authRegisterUrl,
    async () => {
      const { body } = await request(testServer.app)
        .post(authRegisterUrl)
        .send({ email: 'jhon' })
        .expect(400);

      expect(body).toEqual({
        ...responseError,
        messages: [
          'The email is invalid',
          'Name is required',
          'Password is required',
        ],
      });
    },
  );

  test(
    'Should show error messages for the data sent ' + authLoginUrl,
    async () => {
      const { body } = await request(testServer.app)
        .post(authLoginUrl)
        .send({ email: 'jhongmail.com' })
        .expect(400);

      expect(body).toEqual({
        ...responseError,
        messages: ['The email is invalid', 'Password is required'],
      });
    },
  );
});
