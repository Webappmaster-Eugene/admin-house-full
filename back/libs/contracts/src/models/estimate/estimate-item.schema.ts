import { z } from 'zod';
import { EEstimateItemTypeVariants } from '../../enums';

export const EstimateItemSchema = z.object({
  uuid: z.string().uuid(),
  orderIndex: z.number().int().nonnegative(),
  itemType: EEstimateItemTypeVariants,
  sectionUuid: z.string().uuid(),
  materialUuid: z.string().uuid().nullable().optional(),
  unitTemplateUuid: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(500),
  unitMeasurement: z.string().min(1).max(50),
  quantity: z.number().nonnegative(),
  unitCost: z.number().nonnegative(),
  markupPercent: z.number().min(0),
  unitClientPrice: z.number().nonnegative(),
  totalCost: z.number().nonnegative(),
  totalClientPrice: z.number().nonnegative(),
  comment: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const EstimateItemBusinessValueSchema = EstimateItemSchema.pick({
  uuid: true,
  orderIndex: true,
  itemType: true,
  sectionUuid: true,
  materialUuid: true,
  unitTemplateUuid: true,
  name: true,
  unitMeasurement: true,
  quantity: true,
  unitCost: true,
  markupPercent: true,
  unitClientPrice: true,
  totalCost: true,
  totalClientPrice: true,
  comment: true,
  createdAt: true,
  updatedAt: true,
});
