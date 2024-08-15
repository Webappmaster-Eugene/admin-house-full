import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const FieldVariantsForSelectorFieldTypeSchema = z.object({
  uuid: z.string().uuid(),
  value: z.string(),
  description: z.string().nullable().optional(),
  fieldVariantsForSelectorFieldTypeStatus: EActiveStatusVariants,
  numInOrder: z.number().nullable().optional(),
  handbookUuid: z.string().uuid(),
  fieldOfCategoryMaterialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
