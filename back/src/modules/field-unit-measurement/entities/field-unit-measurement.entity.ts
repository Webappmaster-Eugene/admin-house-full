import { FieldUnitMeasurement } from '.prisma/client';

export class FieldUnitMeasurementEntity implements FieldUnitMeasurement {
  uuid: string;
  comment: string;
  name: string;
  handbookUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fieldUnitMeasurement: Partial<FieldUnitMeasurement>) {
    Object.assign(this, fieldUnitMeasurement);
    return this;
  }
}
