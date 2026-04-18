import { z } from 'zod';

export const PieLayerSchema = z.object({
  uuid: z.string().uuid(),
  orderIndex: z.number().int().nonnegative(),
  constructionPieUuid: z.string().uuid(),
  materialUuid: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(500),
  thickness: z.number().nonnegative(),
  density: z.number().nonnegative(),
  consumptionPerM2: z.number().positive(),
  unitMeasurement: z.string().min(1).max(50),
  unitCost: z.number().nonnegative(),
  comment: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const PieLayerBusinessValueSchema = PieLayerSchema.pick({
  uuid: true,
  orderIndex: true,
  constructionPieUuid: true,
  materialUuid: true,
  name: true,
  thickness: true,
  density: true,
  consumptionPerM2: true,
  unitMeasurement: true,
  unitCost: true,
  comment: true,
  createdAt: true,
  updatedAt: true,
});
