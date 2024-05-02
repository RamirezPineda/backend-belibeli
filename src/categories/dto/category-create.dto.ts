import { z } from 'zod';

export const categoryCreateDtoSchema = z.object({
  name: z.string({ message: 'Name is required' }).min(3).max(50),
  description: z
    .string({ message: 'Description must be of type string' })
    .min(3)
    .max(250)
    .optional(),
});

export type CategoryCreateDto = z.infer<typeof categoryCreateDtoSchema>;
