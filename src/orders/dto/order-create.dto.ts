import { z } from 'zod';

export const orderCreateDtoSchema = z.object({
  code: z
    .string({ message: 'Code is required' })
    .min(3, {
      message: 'The code must be greater than or equal to 3 characters.',
    })
    .max(100, {
      message: 'The code must be less than or equal to 100 characters.',
    }),
  note: z
    .string({ message: 'Note is required' })
    .min(3, {
      message: 'The note must be greater than or equal to 3 characters.',
    })
    .max(300, {
      message: 'The note must be less than or equal to 300 characters.',
    }),
  productOrder: z
    .array(
      z.object({
        productId: z
          .string({ message: 'Product Id is required' })
          .uuid('Product Idmust be of type uuid'),
        quantity: z
          .string({ message: 'Quantity is required' })
          .transform((val) => Number(val))
          .refine((val) => !isNaN(val) && Number.isInteger(val), {
            message: 'Quantity must be of type integer',
          })
          .refine((val) => val > 0, {
            message: 'Quantity must be greater than 0',
          }),
      }),
      { message: 'Product Order is required' },
    )
    .nonempty('Product Order must not be empty'),
});

export type OrderCreateDto = z.infer<typeof orderCreateDtoSchema>;
