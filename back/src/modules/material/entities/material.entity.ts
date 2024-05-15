import { Material } from '@prisma/client';

export class MaterialEntity implements Material {
  uuid: string;
  namePublic: string;
  comment: string;
  handbookUuid: string;
  categoryUuid: string;
  unitMeasurementUuid: string;
  responsiblePartnerUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(material: Partial<Material>) {
    Object.assign(this, material);
    return this;
  }
}
