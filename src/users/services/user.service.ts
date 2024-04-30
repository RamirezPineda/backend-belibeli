import { QueryOptions } from '@common/interfaces';
import { ResponseError, convertToQuery } from '@/common/utils';

import { UserRepository } from '@/users/repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    return this.userRepository.findAll(query);
  }

  async findById(id: string) {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new ResponseError({ messages: ['User not found'] });
    }

    return userFound;
  }
}
