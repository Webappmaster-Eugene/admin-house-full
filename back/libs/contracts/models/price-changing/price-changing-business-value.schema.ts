import { PriceChangingSchema } from './price-changing.schema';

export const PriceChangingBusinessValueSchema = PriceChangingSchema.pick({
  oldPrice: true,
  comment: true,
  newPrice: true,
  source: true,
  uuid: true,
  lastChangeByUserUuid: true,
  materialUuid: true,
});
