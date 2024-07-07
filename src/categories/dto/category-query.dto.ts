import { z } from 'zod';
import { queryOptionsDtoSchema } from '@/common/dto';

export const categoryQueryOptionsDtoSchema = queryOptionsDtoSchema.extend({
  withProducts: z
    .string({ message: 'WithProducts must be a string' })
    .transform((val) => val === 'true')
    .optional(),
});

export type CategoryQueryOptions = z.infer<
  typeof categoryQueryOptionsDtoSchema
>;
