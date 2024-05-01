import { z } from 'zod';
import { validateIsActive } from '@/users/constants/schema-validations.constants';

export const enableOrDisableDtoSchema = z.object({
  isActive: validateIsActive,
});

export type enableOrDisableDto = z.infer<typeof enableOrDisableDtoSchema>;
