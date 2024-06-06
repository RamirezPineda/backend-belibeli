import { z } from 'zod';

const idValidate = (fieldName: string) =>
  z
    .string({ message: `${fieldName} parameter is required` })
    .uuid({ message: `${fieldName} must be of type uuid` });

export const paramsDtoSchema = z.object({
  id: idValidate('Id'),
});

export const paramsNameDtoSchema = z.object({
  name: z.string({ message: 'Nmae parameter is required' }),
});

export const userIdParamsDtoSchema = z.object({
  userId: idValidate('User Id'),
});

export const idAndUserIdParamsDtoSchema = paramsDtoSchema.extend({
  userId: idValidate('User Id'),
});

export type paramsDto = z.infer<typeof paramsDtoSchema>;
export type paramsNameDto = z.infer<typeof paramsNameDtoSchema>;
export type userIdParamsDto = z.infer<typeof userIdParamsDtoSchema>;
export type idAndUserIdParamsDto = z.infer<typeof idAndUserIdParamsDtoSchema>;
