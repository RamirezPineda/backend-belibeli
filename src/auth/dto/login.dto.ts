import { z } from 'zod';

export const loginDtoSchema = z.object({
  email: z
    .string({ message: 'Password is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, {
      message: 'The password must be greater than or equal to 8 characters.',
    })
    .max(50, {
      message: 'The password must be less than or equal to 50 characters.',
    }),
});

export type LoginDto = z.infer<typeof loginDtoSchema>;
