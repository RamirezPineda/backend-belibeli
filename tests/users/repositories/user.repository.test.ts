import { prisma } from '@/common/database/conection.database';
import type { Query } from '@/common/interfaces';

import { UserRepository } from '@/users/repositories/user.repository';
import { EnumRole } from '@/users/models/user.model';
import { type UserCreateDto } from '@/users/dto/user-create.dto';
import type { UserUpdateDto } from '@/users/dto';
import { enableOrDisableDto } from '../../../src/users/dto/user-enable-or-disable.dto';

describe('Test user.repository', () => {
  const userRepository = new UserRepository();

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createdAt = new Date();
  const updatedAt = new Date();
  const mockUser = {
    id: 'abc123',
    email: 'jhon@gmail.com',
    name: 'Jhon Doe',
    password: '12345678',
    isActive: true,
    role: EnumRole.CUSTOMER,
    createdAt,
    updatedAt,
  };

  test('Should create a new user', async () => {
    const userCreateDto: UserCreateDto = {
      email: 'jhon@gmail.com',
      name: 'Jhon Doe',
      password: '12345678',
    };
    const newUser = {
      ...userCreateDto,
      id: 'abc123',
      isActive: true,
      role: EnumRole.CUSTOMER,
      createdAt,
      updatedAt,
    };

    const prismaUserCreateSpy = vi.spyOn(prisma.user, 'create');
    prismaUserCreateSpy.mockResolvedValueOnce(mockUser);

    const createdUser = await userRepository.create(userCreateDto);

    expect(prisma.user.create).toHaveBeenCalledWith({ data: userCreateDto });
    expect(createdUser).toEqual(newUser);
  });

  test('Should find a user whith email', async () => {
    const prismaUserFindSpy = vi.spyOn(prisma.user, 'findUnique');
    prismaUserFindSpy.mockResolvedValueOnce(mockUser);

    const user = await userRepository.findByEmail(mockUser.email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUser.email, isActive: true },
    });
    expect(user).toEqual(mockUser);
  });

  test('Should find the user by id', async () => {
    const prismaUserFindSpy = vi.spyOn(prisma.user, 'findUnique');
    prismaUserFindSpy.mockResolvedValueOnce(mockUser);

    const user = await userRepository.findById(mockUser.id);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id, isActive: true },
    });
    expect(user).toEqual(mockUser);
  });

  test('Should find all users', async () => {
    const query: Query = {
      skip: 0,
      take: 1,
      orderBy: { createdAt: 'desc' },
      where: {},
    };
    const prismaUserFindSpy = vi.spyOn(prisma.user, 'findMany');
    prismaUserFindSpy.mockResolvedValueOnce([mockUser]);

    const users = await userRepository.findAll(query);

    expect(prisma.user.findMany).toHaveBeenCalledWith(query);
    expect(users).toEqual([mockUser]);
  });

  test('Should update the user data', async () => {
    const id = 'myid';
    const userUpdateDto: UserUpdateDto = {
      email: 'jhon@gmail.com',
      name: 'Jhon Doe edit',
      password: '12345678',
    };
    const userUpdated = {
      email: 'jhon@gmail.com',
      name: 'Jhon Doe edit',
      password: '12345678',
      id: 'abc123',
      isActive: true,
      role: EnumRole.CUSTOMER,
      createdAt,
      updatedAt,
    };

    const prismaUserCreateSpy = vi.spyOn(prisma.user, 'update');
    prismaUserCreateSpy.mockResolvedValueOnce(userUpdated);

    const updateUser = await userRepository.update(id, userUpdateDto);

    expect(prisma.user.update).toHaveBeenCalledWith({
      data: userUpdateDto,
      where: { id },
    });
    expect(updateUser).toEqual(userUpdated);
  });

  test('Should disable a user', async () => {
    const id = 'myid';
    const enableOrDisableDto: enableOrDisableDto = { isActive: false };
    const userUpdated = {
      email: 'jhon@gmail.com',
      name: 'Jhon Doe edit',
      password: '12345678',
      id: 'abc123',
      isActive: false,
      role: EnumRole.CUSTOMER,
      createdAt,
      updatedAt,
    };

    const prismaUserCreateSpy = vi.spyOn(prisma.user, 'update');
    prismaUserCreateSpy.mockResolvedValueOnce(userUpdated);

    const updateUser = await userRepository.enableOrDisable(
      id,
      enableOrDisableDto.isActive,
    );

    expect(prisma.user.update).toHaveBeenCalledWith({
      data: { isActive: enableOrDisableDto.isActive },
      where: { id },
    });
    expect(updateUser).toEqual(userUpdated);
  });
});
