import { z } from 'zod';
import { EEstimateItemTypeVariants } from '../../enums';

export const EstimateItemComponentSchema = z.object({
  uuid: z.string().uuid(),
  orderIndex: z.number().int().nonnegative(),
  estimateItemUuid: z.string().uuid(),
  itemType: EEstimateItemTypeVariants,
  materialUuid: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(500),
  unitMeasurement: z.string().min(1).max(50),
  quantityPerUnit: z.number().positive(),
  unitCost: z.number().nonnegative(),
  totalCost: z.number().nonnegative(),
  comment: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const EstimateItemComponentBusinessValueSchema = EstimateItemComponentSchema.pick({
  uuid: true,
  orderIndex: true,
  estimateItemUuid: true,
  itemType: true,
  materialUuid: true,
  name: true,
  unitMeasurement: true,
  quantityPerUnit: true,
  unitCost: true,
  totalCost: true,
  comment: true,
  createdAt: true,
  updatedAt: true,
});
