import { Bcrypt } from '@/auth/utils';

describe('Test bcrypt.utils', () => {
  const password = '12345678';

  test('Should encrypt password', async () => {
    const passwordHash = await Bcrypt.encryptPassword(password);

    expect(passwordHash).toBeTypeOf('string');
    expect(passwordHash.length).toEqual(60);
  });

  test('Should encrypt password', async () => {
    const passwordHash = await Bcrypt.encryptPassword(password);
    const isOK = await Bcrypt.verifyPassword(password, passwordHash);

    expect(isOK).toBeTypeOf('boolean');
    expect(isOK).toEqual(true);
  });
});
