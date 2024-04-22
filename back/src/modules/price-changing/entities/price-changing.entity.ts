import { PriceChanging } from '@prisma/client';

export class PriceChangingEntity implements PriceChanging {
  uuid: string;
  newPrice: number;
  changedByUuid: string;
  comment: string;
  materialUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(priceChanging: Partial<PriceChanging>) {
    Object.assign(this, priceChanging);
    return this;
  }
}
