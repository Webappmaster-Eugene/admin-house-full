import { FieldUnitMeasurement } from '@prisma/client';

export class FieldUnitMeasurementEntity implements FieldUnitMeasurement {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(field-unit-measurement: Partial<FieldUnitMeasurement>) {
    Object.assign(this, field-unit-measurement);
    return this;
  }
}
