import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const FieldOfCategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  fieldOfCategoryMaterialStatus: EActiveStatusVariants.nullish().default('ACTIVE'),
  numInOrder: z.number().nullable().optional(),
  uniqueNameForTemplate: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  isRequired: z.boolean().default(true),
  defaultValue: z.string().nullable().optional(),
  handbookUuid: z.string().uuid(),
  unitOfMeasurementUuid: z.string().uuid(),
  fieldTypeUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
