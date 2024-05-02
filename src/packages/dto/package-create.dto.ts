import { z } from 'zod';

export const packageCreateDtoSchema = z.object({
  high: z
    .number({ message: 'High is required' })
    .min(0, "High can't be less than 0"),
  width: z
    .number({ message: 'Width is required' })
    .min(0, "Width can't be less than 0"),
  length: z
    .number({ message: 'Length is required' })
    .min(0, "Length can't be less than 0"),
  weight: z
    .number({ message: 'Weight is required' })
    .min(0, "Weight can't be less than 0"),
});

export type PackageCreateDto = z.infer<typeof packageCreateDtoSchema>;
