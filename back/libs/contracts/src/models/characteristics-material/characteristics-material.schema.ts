import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const CharacteristicsMaterialSchema = z.object({
  uuid: z.string().uuid(),
  value: z.string(),
  characteristicsMaterialStatus: EActiveStatusVariants,
  numInOrder: z.number().optional().nullable(),
  comment: z.string().optional().nullable(),
  fieldOfCategoryMaterialUuid: z.string().uuid(),
  handbookUuid: z.string().uuid(),
  materialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
