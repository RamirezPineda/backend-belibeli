import { z } from 'zod';
import { queryOptionsDtoSchema } from '@/common/dto';

export const productQueryOptionsDtoSchema = queryOptionsDtoSchema.extend({
  categoryId: z
    .string({ message: 'CategoryId must be a string' })
    .uuid('CategoryId must be of type uuid')
    .optional(),
});

export type ProductQueryOptions = z.infer<typeof productQueryOptionsDtoSchema>;
