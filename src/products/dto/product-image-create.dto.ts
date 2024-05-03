import { z } from 'zod';

export const productImageCreateDtoSchema = z.object({
  url: z
    .string({ message: 'Url is required' })
    .startsWith('http', 'Url must start with http or https'),
});

export type ProductImageCreateDto = z.infer<typeof productImageCreateDtoSchema>;
