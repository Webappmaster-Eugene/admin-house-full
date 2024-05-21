import { Material } from '.prisma/client';

export class MaterialEntity implements Material {
  uuid: string;
  name: string;
  namePublic: string;
  comment: string;
  price: number;
  handbookUuid: string;
  categoryMaterialUuid: string;
  unitMeasurementUuid: string;
  responsiblePartnerUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(material: Partial<Material>) {
    Object.assign(this, material);
    return this;
  }
}
