import { z } from 'zod';

export const discountCreateDtoSchema = z.object({
  amount: z
    .number({ message: 'Amount is required' })
    .min(0, {
      message: 'The amount must be greater than or equal to 0.0',
    })
    .max(1, {
      message: 'The name must be less than or equal to 1',
    }),
  name: z
    .string({ message: 'Name is required' })
    .min(3, {
      message: 'The name must be greater than or equal to 3 characters.',
    })
    .max(50, {
      message: 'The name must be less than or equal to 50 characters.',
    }),
});

export type DiscountCreateDto = z.infer<typeof discountCreateDtoSchema>;
