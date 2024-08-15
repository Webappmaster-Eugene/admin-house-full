import { EActiveStatuses, FieldUnitMeasurement, Handbook } from '.prisma/client';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';

export interface FieldUnitMeasurementRelatedEntities {
  handbook: Handbook;
}

export class FieldUnitMeasurementEntity implements FieldUnitMeasurement, FieldUnitMeasurementRelatedEntities {
  uuid: string;
  comment: string;
  name: string;
  numInOrder: number;
  handbookUuid: string;
  fieldUnitMeasurementStatus: EActiveStatuses;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  handbook: Handbook;

  constructor(fieldUnitMeasurement: Partial<FieldUnitMeasurement>) {
    Object.assign(this, fieldUnitMeasurement);
    return this;
  }
}
