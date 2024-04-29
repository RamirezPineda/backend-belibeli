import { z } from 'zod';

export const userCreateDtoSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'The email is invalid' }),
  name: z
    .string({ message: 'Name is required' })
    .min(3, {
      message: 'The name must be greater than or equal to 3 characters.',
    })
    .max(50, {
      message: 'The name must be less than or equal to 50 characters.',
    }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, {
      message: 'The password must be greater than or equal to 8 characters.',
    })
    .max(50, {
      message: 'The password must be less than or equal to 50 characters.',
    }),
});

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>;
