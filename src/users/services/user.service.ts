import { QueryOptions } from '@common/interfaces';
import {
  ResponseError,
  convertToQuery,
  excludeAttributes,
} from '@/common/utils';
import { Bcrypt } from '@/auth/utils';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserCreateDto } from '@/users/dto';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const users = await this.userRepository.findAll(query);

    return users.map((user) => excludeAttributes(user, ['password']));
  }

  async create(userCreateDto: UserCreateDto) {
    const userFound = await this.userRepository.findByEmail(
      userCreateDto.email,
    );

    if (userFound) {
      throw new ResponseError({
        messages: ['There is already a user with that email'],
      });
    }

    const passwordHash = await Bcrypt.encryptPassword(userCreateDto.password);
    const newUser = await this.userRepository.create({
      ...userCreateDto,
      password: passwordHash,
    });

    const user = excludeAttributes(newUser, ['password']);
    return user;
  }

  async findById(id: string) {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new ResponseError({ messages: ['User not found'] });
    }

    return userFound;
  }

  async enableOrDisable(id: string, isActive: boolean) {
    await this.userRepository.findById(id);
    return this.userRepository.enableOrDisable(id, isActive);
  }
}
