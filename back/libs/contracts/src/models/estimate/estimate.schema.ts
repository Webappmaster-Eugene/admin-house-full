import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const EstimateSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),
  estimateStatus: EActiveStatusVariants.nullish().default('ACTIVE'),
  defaultMarkupPercent: z.number().min(0).default(0),
  totalCost: z.number().nonnegative(),
  totalClientPrice: z.number().nonnegative(),
  projectUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
