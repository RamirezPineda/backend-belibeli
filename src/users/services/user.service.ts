import { QueryOptions } from '@common/interfaces';
import { convertToQuery } from '@/common/utils';

import { UserRepository } from '@/users/repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    return this.userRepository.findAll(query);
  }
}
