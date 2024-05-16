import { z } from 'zod';

const productOrderCreateDtoSchema = z.array(
  z.object({
    productId: z
      .string({ message: 'Product Id is required' })
      .uuid('Product Id must be of type uuid'),
    quantity: z
      .number({ message: 'Quantity is required' })
      .refine((val) => Number.isInteger(val), {
        message: 'Quantity must be of type integer',
      })
      .refine((val) => val > 0, {
        message: 'Quantity must be greater than 0',
      }),
  }),
  { message: 'Product Order is required' },
);

export const orderCreateDtoSchema = z.object({
  note: z
    .string({ message: 'Note is required' })
    .min(3, {
      message: 'The note must be greater than or equal to 3 characters.',
    })
    .max(300, {
      message: 'The note must be less than or equal to 300 characters.',
    }),
  confirmationTokenId: z.string({
    message: 'Payment confirmation token is required',
  }),
  productOrder: productOrderCreateDtoSchema,
});

export type OrderCreateDto = z.infer<typeof orderCreateDtoSchema>;
export type ProductOrderCreateDto = z.infer<typeof productOrderCreateDtoSchema>;
