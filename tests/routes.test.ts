import request from 'supertest';

import { ENDPOINTS, PATH_PREFIX } from '@/common/constants';
import { testServer } from '@tests/test-server';

const healthUrl = PATH_PREFIX + ENDPOINTS.HEALTH;

describe('Testing routes.ts', async () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  test('should return status 200 | GET ' + healthUrl, async () => {
    await request(testServer.app).get(healthUrl).expect(200);
  });
});
