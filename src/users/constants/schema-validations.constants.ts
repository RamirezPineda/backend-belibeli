import { z } from 'zod';

export const validateEmail = z
  .string({ message: 'Email is required' })
  .email({ message: 'The email is invalid' });

export const validateName = z
  .string({ message: 'Name is required' })
  .min(3, {
    message: 'The name must be greater than or equal to 3 characters.',
  })
  .max(50, {
    message: 'The name must be less than or equal to 50 characters.',
  });

export const validatePassword = z
  .string({ message: 'Password is required' })
  .min(8, {
    message: 'The password must be greater than or equal to 8 characters.',
  })
  .max(50, {
    message: 'The password must be less than or equal to 50 characters.',
  });

export const validateIsActive = z
  .string({
    message: 'IsActive is required',
  })
  .refine(
    (val) =>
      val.toLocaleLowerCase() === 'true' || val.toLocaleLowerCase() === 'false',
    {
      message: 'IsActive must be of type boolean',
    },
  )
  .transform((val) => val.toLocaleLowerCase() === 'true');
