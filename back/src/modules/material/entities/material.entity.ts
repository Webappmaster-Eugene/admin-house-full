import {
  CategoryMaterial,
  CharacteristicsMaterial,
  FieldUnitMeasurement,
  Handbook,
  Material,
  PriceChanging,
  ResponsiblePartnerProducer,
} from '.prisma/client';

export interface MaterialRelatedEntities {
  responsiblePartner: ResponsiblePartnerProducer;
  unitMeasurement: FieldUnitMeasurement;
  handbook: Handbook;
  categoryMaterial: CategoryMaterial;
  characteristicsMaterial: CharacteristicsMaterial[];
  priceChanges: PriceChanging[];
}

export class MaterialEntity implements Material, MaterialRelatedEntities {
  uuid: string;
  name: string;
  sourceInfo: string;
  namePublic: string;
  comment: string;
  price: number;
  handbookUuid: string;
  categoryMaterialUuid: string;
  unitMeasurementUuid: string;
  responsiblePartnerUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  responsiblePartner: ResponsiblePartnerProducer;
  unitMeasurement: FieldUnitMeasurement;
  handbook: Handbook;
  categoryMaterial: CategoryMaterial;
  characteristicsMaterial: CharacteristicsMaterial[];
  priceChanges: PriceChanging[];

  constructor(material: Partial<Material>) {
    Object.assign(this, material);
    return this;
  }
}
