import * as bcrypt from 'bcrypt';
import { EnvConfig } from '@/config';

export class Bcrypt {
  static async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, EnvConfig.SALT_ROUNDS);
  }

  static async verifyPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
