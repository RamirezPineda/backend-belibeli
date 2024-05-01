import { z } from 'zod';
import {
  validateEmail,
  validateIsActive,
  validateName,
  validatePassword,
} from '@/users/constants/schema-validations.constants';

export const userUpdateDtoSchema = z.object({
  email: validateEmail.optional(),
  name: validateName.optional(),
  password: validatePassword.optional(),
  isActive: validateIsActive.optional(),
});

export type UserUpdateDto = z.infer<typeof userUpdateDtoSchema>;
