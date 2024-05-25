import { z } from 'zod';

export const productFavoriteAddOrRemoveDtoSchema = z
  .object({
    productId: z
      .string({ message: 'ProductId is required' })
      .uuid('ProductId must be of type uuid'),
  })
  .strict();

export type ProductFavoriteAddOrRemoveDto = z.infer<
  typeof productFavoriteAddOrRemoveDtoSchema
>;
