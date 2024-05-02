import { z } from 'zod';

export const categoryUpdateDtoSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(3, {
      message: 'The name must be greater than or equal to 3 characters.',
    })
    .max(50, {
      message: 'The name must be less than or equal to 50 characters.',
    })
    .optional(),
  description: z
    .string({ message: 'Description must be of type string' })
    .min(3, {
      message: 'The description must be greater than or equal to 3 characters.',
    })
    .max(250, {
      message: 'The description must be less than or equal to 50 characters.',
    })
    .optional(),
  imageUrl: z
    .string({ message: 'ImageUrl must be of type string' })
    .startsWith('http', { message: 'ImageUrl must start with http' })
    .optional(),
});

export type CategoryUpdateDto = z.infer<typeof categoryUpdateDtoSchema>;
