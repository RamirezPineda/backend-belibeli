import { z } from 'zod';
import { OrderEnum } from '@common/interfaces';

const orderValues = Object.keys(OrderEnum);

export const queryOptionsDtoSchema = z.object({
  offset: z
    .string()
    .trim()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Offset must be of type number' })
    .refine((val) => val >= 0, {
      message: 'Offset must be greater than or equal to zero',
    })
    .optional(),
  limit: z
    .string()
    .trim()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Limit must be of type number' })
    .refine((val) => val >= 0, {
      message: 'Limit must be greater than or equal to zero',
    })
    .optional(),
  order: z
    .string()
    .trim()
    .refine((val) => orderValues.includes(val), {
      message: 'Order must be asc or desc',
    })
    .optional(),
  attr: z
    .string()
    .trim()
    .min(1, { message: 'Attr  must be greater than or equal to one character' })
    .optional(),
  value: z.string().trim().optional(),
});

export type queryOptionsDto = z.infer<typeof queryOptionsDtoSchema>;
