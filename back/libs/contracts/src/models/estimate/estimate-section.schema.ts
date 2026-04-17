import { z } from 'zod';

export const EstimateSectionSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1).max(255),
  orderIndex: z.number().int().nonnegative(),
  estimateUuid: z.string().uuid(),
  parentSectionUuid: z.string().uuid().nullable().optional(),
  sectionTotalCost: z.number().nonnegative(),
  sectionTotalClientPrice: z.number().nonnegative(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const EstimateSectionBusinessValueSchema = EstimateSectionSchema.pick({
  uuid: true,
  name: true,
  orderIndex: true,
  estimateUuid: true,
  parentSectionUuid: true,
  sectionTotalCost: true,
  sectionTotalClientPrice: true,
  createdAt: true,
  updatedAt: true,
});
