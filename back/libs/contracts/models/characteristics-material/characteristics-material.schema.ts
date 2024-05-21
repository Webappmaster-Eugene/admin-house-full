import { z } from 'zod';

export const CharacteristicsMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  value: z.string(),
  comment: z.string().optional().nullable(),
  fieldOfCategoryMaterialUuid: z.string(),
  addedByUserUuid: z.string(),
  handbookUuid: z.string(),
  materialUuid: z.string(),
  fieldTypeUuid: z.string(),
  fieldUnitMeasurementUuid: z.string().optional().nullable(),
  categoryMaterialUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
