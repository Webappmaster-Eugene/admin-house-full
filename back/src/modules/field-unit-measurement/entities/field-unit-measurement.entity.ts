import { FieldUnitMeasurement, Handbook } from '.prisma/client';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';

export interface FieldUnitMeasurementRelatedEntities {
  handbook: HandbookEntity;
}

export class FieldUnitMeasurementEntity implements FieldUnitMeasurement, FieldUnitMeasurementRelatedEntities {
  uuid: string;
  comment: string;
  name: string;
  handbookUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  handbook: HandbookEntity;

  constructor(fieldUnitMeasurement: Partial<FieldUnitMeasurement>) {
    Object.assign(this, fieldUnitMeasurement);
    return this;
  }
}
