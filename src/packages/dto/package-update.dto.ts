import { z } from 'zod';

export const packageUpdateDtoSchema = z.object({
  high: z
    .number({ message: 'High is required' })
    .min(0, "High can't be less than 0")
    .optional(),
  width: z
    .number({ message: 'Width is required' })
    .min(0, "Width can't be less than 0")
    .optional(),
  length: z
    .number({ message: 'Length is required' })
    .min(0, "Length can't be less than 0")
    .optional(),
  weight: z
    .number({ message: 'Weight is required' })
    .min(0, "Weight can't be less than 0")
    .optional(),
});

export type PackageUpdateDto = z.infer<typeof packageUpdateDtoSchema>;
