import { z } from 'zod';
import { EEstimateItemTypeVariants } from '../../enums';

export const UnitTemplateComponentSchema = z.object({
  uuid: z.string().uuid(),
  orderIndex: z.number().int().nonnegative(),
  itemType: EEstimateItemTypeVariants,
  unitTemplateUuid: z.string().uuid(),
  materialUuid: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(500),
  unitMeasurement: z.string().min(1).max(50),
  quantityPerUnit: z.number().positive(),
  unitCost: z.number().nonnegative(),
  comment: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UnitTemplateComponentBusinessValueSchema = UnitTemplateComponentSchema.pick({
  uuid: true,
  orderIndex: true,
  itemType: true,
  unitTemplateUuid: true,
  materialUuid: true,
  name: true,
  unitMeasurement: true,
  quantityPerUnit: true,
  unitCost: true,
  comment: true,
  createdAt: true,
  updatedAt: true,
});
