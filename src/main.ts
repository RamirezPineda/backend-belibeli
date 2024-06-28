import { Server as ServerSocket } from 'socket.io';
import { type DefaultEventsMap } from 'socket.io/dist/typed-events';

import { Server } from '@/server';
import { Routes } from '@/routes';
import { EnvConfig } from '@/config';

async function main() {
  const server = new Server({
    port: EnvConfig.PORT,
    routes: Routes.routes,
  });

  server.start();
  return server;
}

let socket:
  | ServerSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  | undefined;

(async () => {
  const server = await main();
  socket = server.socketIo;
})();

export { socket };
