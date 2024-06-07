import { PriceChanging } from '.prisma/client';

export class PriceChangingEntity implements PriceChanging {
  uuid: string;
  newPrice: number;
  oldPrice: number;
  comment: string;
  source: string;
  materialUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(priceChanging: Partial<PriceChanging>) {
    Object.assign(this, priceChanging);
    return this;
  }
}
