import { z } from 'zod';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '@/users/constants/schema-validations.constants';

export const userCreateDtoSchema = z.object({
  email: validateEmail,
  name: validateName,
  password: validatePassword,
});

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>;
