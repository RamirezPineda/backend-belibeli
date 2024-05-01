import { z } from 'zod';

export const paramsDtoSchema = z.object({
  id: z
    .string({ message: 'Id parameter is required' })
    .uuid({ message: 'Id must be of type uuid' }),
});

export type paramsDto = z.infer<typeof paramsDtoSchema>;
