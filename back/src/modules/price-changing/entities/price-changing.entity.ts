import { Material, PriceChanging } from '.prisma/client';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';

export interface PriceChangingRelatedEntities {
  material: Material;
}

export class PriceChangingEntity implements PriceChanging, PriceChangingRelatedEntities {
  uuid: string;
  newPrice: number;
  oldPrice: number;
  comment: string;
  source: string;
  materialUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  material: Material;

  constructor(priceChanging: Partial<PriceChanging>) {
    Object.assign(this, priceChanging);
    return this;
  }
}
