import type { QueryOptions } from '@/common/interfaces';
import { ResponseError } from '@/common/utils';
import { UserCreateDto } from '@/users/dto';
import { EnumRole, type User } from '@/users/models/user.model';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserService } from '@/users/services/user.service';

const id = 'myuuid';
const userCreateDto: UserCreateDto = {
  email: 'ramirez@gmail.com',
  name: 'Roy Ramirez',
  password: '12345678',
};
const user: Omit<User, 'password'> = {
  id: 'abc123',
  email: 'ramirez@gmail.com',
  name: 'Roy Ramirez',
  role: EnumRole.CUSTOMER,
  isActive: true,
};

const mockUsers: User[] = [{ ...user, password: '12345678' }];
const users: Omit<User, 'password'>[] = [user];

describe('Test user.service', () => {
  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  test('Should find all users', async () => {
    const queryOptions: QueryOptions = {};
    const userRepositoryFindAllSpy = vi.spyOn(
      UserRepository.prototype,
      'findAll',
    );

    userRepositoryFindAllSpy.mockResolvedValueOnce(mockUsers);

    const response = await userService.findAll(queryOptions);

    expect(response).toEqual(users);
  });

  test('Should find a user', async () => {
    const userRepositoryFindByIdSpy = vi.spyOn(
      UserRepository.prototype,
      'findById',
    );

    userRepositoryFindByIdSpy.mockResolvedValueOnce({
      ...user,
      password: '12345678',
    });

    const response = await userService.findById(id);

    expect(response).toEqual(user);
  });

  test('Should return an error when it does not find the user', async () => {
    const userRepositoryFindByIdSpy = vi.spyOn(
      UserRepository.prototype,
      'findById',
    );

    userRepositoryFindByIdSpy.mockResolvedValueOnce(null);

    await expect(userService.findById(id)).rejects.toThrow(ResponseError);
  });

  test('Should create a new user', async () => {
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );
    const userRepositoryCreateSpy = vi.spyOn(
      UserRepository.prototype,
      'create',
    );

    userRepositoryFindSpy.mockResolvedValueOnce(null);
    userRepositoryCreateSpy.mockResolvedValueOnce({
      ...user,
      password: '12345678',
    });

    const response = await userService.create(userCreateDto);

    expect(response).toEqual(user);
  });

  test('Should return error user already exist', async () => {
    const userRepositoryFindSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );

    userRepositoryFindSpy.mockResolvedValueOnce({
      ...user,
      password: '12345678',
    });

    await expect(userService.create(userCreateDto)).rejects.toThrow(
      ResponseError,
    );
  });
});
