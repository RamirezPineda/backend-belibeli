import { z } from 'zod';
import { discountCreateDtoSchema } from '@/discounts/dto';

export const discountUpdateDtoSchema = discountCreateDtoSchema.partial();

export type DiscountUpdateDto = z.infer<typeof discountUpdateDtoSchema>;
