import { FieldUnitMeasurementSchema } from '../field-unit-measurement';

export const FieldUnitMeasurementBusinessValueSchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
});