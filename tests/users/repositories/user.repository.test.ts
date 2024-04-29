import { prisma } from '@/common/database/conection.database';
import { UserRepository } from '@/users/repositories/user.repository';
import { type UserCreateDto } from '@/users/dto/user-create.dto';

describe('Test user.repository', () => {
  const userRepository = new UserRepository();

  afterEach(() => {
    vi.clearAllMocks();
  });

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
      role: 'CUSTOMER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const prismaUserCreateSpy = vi.spyOn(prisma.user, 'create');
    prismaUserCreateSpy.mockResolvedValueOnce({ ...newUser, role: 'CUSTOMER' });

    const createdUser = await userRepository.create(userCreateDto);

    expect(prisma.user.create).toHaveBeenCalledWith({ data: userCreateDto });
    expect(createdUser).toEqual(newUser);
  });

  test('Should find a user whith email', async () => {
    const userFound = {
      id: 'abc123',
      email: 'jhon@gmail.com',
      name: 'Jhon Doe',
      password: '12345678',
      isActive: true,
      role: 'CUSTOMER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const prismaUserFindSpy = vi.spyOn(prisma.user, 'findUnique');
    prismaUserFindSpy.mockResolvedValueOnce({ ...userFound, role: 'CUSTOMER' });

    const user = await userRepository.findByEmail(userFound.email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userFound.email },
    });
    expect(user).toEqual(userFound);
  });
});
