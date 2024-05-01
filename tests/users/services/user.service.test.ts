import type { QueryOptions } from '@/common/interfaces';
import { ResponseError } from '@/common/utils';
import { UserCreateDto, UserUpdateDto } from '@/users/dto';
import { EnumRole, type User } from '@/users/models/user.model';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserService } from '@/users/services/user.service';

const id = 'myuuid';
const userCreateDto: UserCreateDto = {
  email: 'ramirez@gmail.com',
  name: 'Roy Ramirez',
  password: '12345678',
};
const userUpdateDto: UserUpdateDto = {
  email: 'ramirez@gmail.com',
  name: 'Name edited',
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
    const queryOptions: QueryOptions = {
      offset: 0,
      limit: 1,
      order: 'desc',
      attr: 'name',
      value: 'roy',
    };
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

  test('Should enable the user', async () => {
    const userRepositoryEnableSpy = vi.spyOn(
      UserRepository.prototype,
      'enableOrDisable',
    );
    const userServiceSpy = vi.spyOn(UserService.prototype, 'findById');

    userServiceSpy.mockResolvedValueOnce(user);
    userRepositoryEnableSpy.mockResolvedValueOnce({
      ...user,
      password: '12345678',
    });

    const response = await userService.enableOrDisable(id, true);

    expect(response).toEqual(user);
  });

  test('Should disable the user', async () => {
    const userRepositoryEnableSpy = vi.spyOn(
      UserRepository.prototype,
      'enableOrDisable',
    );
    const userServiceSpy = vi.spyOn(UserService.prototype, 'findById');

    userServiceSpy.mockResolvedValueOnce(user);
    userRepositoryEnableSpy.mockResolvedValueOnce({
      ...user,
      isActive: false,
      password: '12345678',
    });

    const response = await userService.enableOrDisable(id, false);

    expect(response).toEqual({ ...user, isActive: false });
  });

  test('Should update the user data', async () => {
    const userServiceFindByIdSpy = vi.spyOn(UserService.prototype, 'findById');
    const userRepositoryUpdatSpy = vi.spyOn(UserRepository.prototype, 'update');
    const userRepositoryFindByEmailSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );

    userServiceFindByIdSpy.mockResolvedValueOnce(user);
    userRepositoryFindByEmailSpy.mockResolvedValueOnce(null);
    userRepositoryUpdatSpy.mockResolvedValueOnce({
      ...user,
      password: '12345678',
      name: 'Name edited',
    });

    const response = await userService.update(id, userUpdateDto);

    expect(response).toEqual({ ...user, name: 'Name edited' });
  });

  test('An error should return when updating because the email is already in use', async () => {
    const userServiceFindByIdSpy = vi.spyOn(UserService.prototype, 'findById');
    const userRepositoryFindByEmailSpy = vi.spyOn(
      UserRepository.prototype,
      'findByEmail',
    );

    userServiceFindByIdSpy.mockResolvedValueOnce(user);
    userRepositoryFindByEmailSpy.mockResolvedValueOnce({
      ...user,
      id: 'xyz123',
      password: '12345678',
    });

    await expect(userService.update(id, userUpdateDto)).rejects.toThrow(
      ResponseError,
    );
  });
});
