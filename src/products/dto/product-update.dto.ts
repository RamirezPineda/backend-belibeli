import { z } from 'zod';
import { productCreateDtoSchema } from './product-create.dto';

export const productUpdateDtoSchema = productCreateDtoSchema.partial();

export type ProductUpdateDto = z.infer<typeof productUpdateDtoSchema>;
