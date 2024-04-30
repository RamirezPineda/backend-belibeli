import { ResponseError, excludeAttributes } from '@/common/utils';
import { Bcrypt, JsonWebToken } from '@/auth/utils';

import type { LoginDto } from '@/auth/dto/login.dto';
import type { UserCreateDto } from '@/users/dto/user-create.dto';

import { UserRepository } from '@/users/repositories/user.repository';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userCreateDto: UserCreateDto) {
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

  async login(loginDto: LoginDto) {
    const userFound = await this.userRepository.findByEmail(loginDto.email);

    if (!userFound) {
      throw new ResponseError({ messages: ['Email or password incorrect'] });
    }

    const isOk = await Bcrypt.verifyPassword(
      loginDto.password,
      userFound.password,
    );

    if (!isOk) {
      throw new ResponseError({ messages: ['Email or password incorrect'] });
    }

    const payload = JsonWebToken.convertToPayload(userFound);
    const token = await JsonWebToken.generateToken(payload);

    const user = excludeAttributes(userFound, ['password']);

    return { token, user };
  }
}
