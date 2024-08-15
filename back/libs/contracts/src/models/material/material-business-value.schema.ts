import { MaterialSchema } from './material.schema';

export const MaterialBusinessValueSchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  numInOrder: true,
  materialStatus: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
  categoryMaterialUuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
});
