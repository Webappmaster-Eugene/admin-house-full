import {
  CategoryMaterial,
  CharacteristicsMaterial,
  EActiveStatuses,
  FieldUnitMeasurement,
  Handbook,
  Material,
  PriceChanging,
  ResponsiblePartnerProducer,
} from '.prisma/client';
import { ResponsiblePartnerProducerEntity } from 'src/modules/responsible-partner-producer/entities/responsible-partner-producer.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { CategoryMaterialEntity } from 'src/modules/category-material/entities/category-material.entity';
import { CharacteristicsMaterialEntity } from 'src/modules/characteristics-material/entities/characteristics-material.entity';
import { PriceChangingEntity } from 'src/modules/price-changing/entities/price-changing.entity';

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
  numInOrder: number;
  namePublic: string;
  comment: string;
  price: number;
  materialStatus: EActiveStatuses;
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
