import { z } from 'zod';

export const productFavoriteAddOrRemoveDtoSchema = z
  .object({
    id: z
      .string({ message: 'Id is required' })
      .uuid('Id must be of type uuid')
      .optional(),
    productId: z
      .string({ message: 'ProductId is required' })
      .uuid('ProductId must be of type uuid'),
  })
  .strict();

export type ProductFavoriteAddOrRemoveDto = z.infer<
  typeof productFavoriteAddOrRemoveDtoSchema
>;
