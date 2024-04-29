import { EnvConfig } from '@/config';
import { Routes } from '@/routes';
import { Server } from '@/server';

export const testServer = new Server({
  port: EnvConfig.PORT,
  routes: Routes.routes,
});
