import { EActiveStatuses, FieldUnitMeasurement, Handbook } from '.prisma/client';

export interface FieldUnitMeasurementRelatedEntities {
  handbook: Handbook;
}

export class FieldUnitMeasurementEntity implements FieldUnitMeasurement, FieldUnitMeasurementRelatedEntities {
  uuid: string;
  comment: string;
  name: string;
  numInOrder: number;
  handbookUuid: string;
  isDefault: boolean;
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
