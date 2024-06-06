import { z } from 'zod';
import { productCreateDtoSchema } from '@/products/dto';

export const productUpdateDtoSchema = productCreateDtoSchema.partial().extend({
  productImages: z
    .array(
      z
        .string({ message: 'Product image id must be a string' })
        .uuid('Product image id must be a valid UUID'),
      { message: 'Product images is required' },
    )
    .or(
      z
        .string({ message: 'Product image id must be a string' })
        .uuid('Product image id must be a valid UUID')
        .transform((val) => [val]),
    ),
});

export type ProductUpdateDto = z.infer<typeof productUpdateDtoSchema>;
