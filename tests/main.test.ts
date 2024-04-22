import { EnvConfig } from '@/config/app.config';
import { Server } from '@/server';

vi.mock('@/server');

describe('Testing main.ts', async () => {
  await import('@/main');

  test('should initialize the server with arguments', () => {
    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: EnvConfig.PORT,
      routes: expect.any(Function),
    });
    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
