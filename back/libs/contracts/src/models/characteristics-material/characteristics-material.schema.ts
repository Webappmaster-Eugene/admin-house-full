import { z } from 'zod';

export const CharacteristicsMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  value: z.string(),
  comment: z.string().optional().nullable(),
  fieldOfCategoryMaterialUuid: z.string().uuid(),
  handbookUuid: z.string().uuid(),
  fieldTypeUuid: z.string().uuid(),
  fieldUnitMeasurementUuid: z.string().uuid().nullable().optional(),
  // categoryMaterialUuid: z.string().uuid(),
  materialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});