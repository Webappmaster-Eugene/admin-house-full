import { z } from 'zod';

export const UnitTemplateSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),
  unitMeasurement: z.string().min(1).max(50),
  unitCost: z.number().nonnegative(),
  defaultMarkupPercent: z.number().min(0),
  unitClientPrice: z.number().nonnegative(),
  handbookUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const UnitTemplateBusinessValueSchema = UnitTemplateSchema.pick({
  uuid: true,
  name: true,
  description: true,
  unitMeasurement: true,
  unitCost: true,
  defaultMarkupPercent: true,
  unitClientPrice: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});
