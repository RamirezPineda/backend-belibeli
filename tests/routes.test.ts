import request from 'supertest';

import { Routes } from '@/routes';
import { Server } from '@/server';
import { EnvConfig } from '@/config';
import { ENDPOINTS, PATH_PREFIX } from '@/common/constants';

const testServer = new Server({
  port: EnvConfig.PORT,
  routes: Routes.routes,
});

const healthUrl = PATH_PREFIX + ENDPOINTS.HEALTH;

describe('Testing routes.ts', async () => {
  beforeAll(async () => {
    await testServer.start();
  });

  test('should return status 200 | GET ' + healthUrl, async () => {
    await request(testServer.app).get(healthUrl).expect(200);
  });
});
