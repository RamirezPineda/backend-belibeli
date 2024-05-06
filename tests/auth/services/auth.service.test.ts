import { ResponseError, excludeAttributes } from '@/common/utils';

import { AuthService } from '@/auth/services/auth.service';
import { UserRepository } from '@/users/repositories/user.repository';
import type { UserCreateDto } from '@/users/dto';
import type { User } from '@/users/models/user.model';
import { Bcrypt } from '@/auth/utils';
import { LoginDto } from '@/auth/dto/login.dto';

describe('Test auth.service', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    authService = new AuthService(userRepository);
  });

  const userCreateDto: UserCreateDto = {
    email: 'jhon@gmail.com',
    name: 'jhon doee',
    password: '12345678',
  };

  const userFound: User = {
    id: 'abc123',
    email: 'jhon@gmail.com',
    name: 'Jhon Doe',
    password: '12345678',
    role: 'CUSTOMER',
    isActive: true,
  };

  test('Should register a new user', async () => {
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );
    const userRepositoryCreateSpy = vi.spyOn(
      UserRepository.prototype,
      'create',
    );

    const newUser: User = {
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'Jhon Doe',
      password: '12345678',
      role: 'CUSTOMER',
      isActive: true,
    };

    userRepositoryFindSpy.mockResolvedValueOnce(null);
    userRepositoryCreateSpy.mockResolvedValueOnce(newUser);

    const response = await authService.register(userCreateDto);
    expect(response).toEqual({
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'Jhon Doe',
      role: 'CUSTOMER',
      isActive: true,
    });
  });

  test('Should return error user already exist', async () => {
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );

    userRepositoryFindSpy.mockResolvedValueOnce(userFound);

    await expect(authService.register(userCreateDto)).rejects.toThrow(
      ResponseError,
    );
  });

  test('Should login a user', async () => {
    const loginDto: LoginDto = { email: 'jhon@gmail.com', password: '1234567' };
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );
    const bcryptVerifyPassSpy = vi.spyOn(Bcrypt, 'verifyPassword');

    userRepositoryFindSpy.mockResolvedValueOnce(userFound);
    bcryptVerifyPassSpy.mockResolvedValueOnce(true);

    const response = await authService.login(loginDto);
    const user = excludeAttributes(userFound, ['password']);
    const tokenParts = response.token.split('.');

    expect(response.token).toBeTypeOf('string');
    expect(tokenParts.length).toBe(3);
    expect(response.user).toEqual(user);
  });

  test('Should return error when sending incorrect password', async () => {
    const loginDto: LoginDto = { email: 'jhon@gmail.com', password: '1234567' };
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );
    const bcryptVerifyPassSpy = vi.spyOn(Bcrypt, 'verifyPassword');

    userRepositoryFindSpy.mockResolvedValueOnce(userFound);
    bcryptVerifyPassSpy.mockResolvedValueOnce(false);

    await expect(authService.login(loginDto)).rejects.toThrow(ResponseError);
  });

  test('Should return error when sending incorrect email', async () => {
    const loginDto: LoginDto = { email: 'jhon@gmail.com', password: '12' };
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );

    userRepositoryFindSpy.mockResolvedValueOnce(null);

    await expect(authService.login(loginDto)).rejects.toThrow(ResponseError);
  });
});
