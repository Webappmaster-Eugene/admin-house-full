import { EstimateSchema } from './estimate.schema';

export const EstimateBusinessValueSchema = EstimateSchema.pick({
  uuid: true,
  name: true,
  description: true,
  estimateStatus: true,
  defaultMarkupPercent: true,
  totalCost: true,
  totalClientPrice: true,
  projectUuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});
