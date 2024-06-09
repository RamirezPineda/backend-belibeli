import { z } from 'zod';
import { DepartmentEnum } from '@/products/models';

export const productCreateDtoSchema = z
  .object({
    brand: z
      .string({ message: 'Brand is required' })
      .max(50, {
        message: 'The brand must be less than or equal to 50 characters.',
      })
      .optional(),
    department: z.nativeEnum(DepartmentEnum, {
      message: `Department must be of type [${Object.values(DepartmentEnum)}]`,
    }),
    description: z
      .string({ message: 'Description is required' })
      .min(3, {
        message:
          'The description must be greater than or equal to 3 characters.',
      })
      .max(500, {
        message:
          'The description must be less than or equal to 500 characters.',
      }),
    name: z
      .string({ message: 'Name is required' })
      .min(3, {
        message: 'The name must be greater than or equal to 3 characters.',
      })
      .max(100, {
        message: 'The name must be less than or equal to 100 characters.',
      }),
    price: z
      .string({ message: 'Price is required' })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: 'Price must be of type decimal',
      })
      .refine((val) => val > 0, {
        message: 'Price must be greater than 0',
      }),
    sizes: z
      .array(z.string({ message: 'Sizes must be of type string' }), {
        message: 'Sizes is required',
      })
      .max(6, 'Sizes must have at most 6 elements'),
    specification: z
      .string({ message: 'Specification is required' })
      .min(3, 'Specification must be greater than or equal to 3 characters')
      .max(100, 'Specification must be less than or equal to 100 characters'),
    stock: z
      .string({ message: 'Stock is required' })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && Number.isInteger(val), {
        message: 'Stock must be of type integer',
      })
      .refine((val) => val > 0, {
        message: 'Price must be greater than 0',
      }),
    tax: z
      .string({ message: 'Tax is required' })
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: 'Tax must be of type decimal',
      })
      .refine((val) => val >= 0, {
        message: 'Tax must be less than or equal to 0',
      })
      .optional(),
    categoryId: z
      .string({ message: 'Category is required' })
      .uuid({ message: 'Category must be of type uuid' }),
    discountId: z
      .string({ message: 'Discount must be of type string' })
      .optional(),
    packageId: z
      .string({ message: 'Package is required' })
      .uuid({ message: 'Package must be of type uuid' }),
  })
  .strict();

export type ProductCreateDto = z.infer<typeof productCreateDtoSchema>;

// export const updateSchema = productCreateDtoSchema.partial();

// export type ProductUpdateDto = z.infer<typeof updateSchema>;
