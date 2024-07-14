import { z } from 'zod';
import { FieldUnitMeasurementSchema, ResponseClientSchema } from '../../models';
import { FieldUnitMeasurementRelatedEntitiesSchema } from '../../models/field-unit-measurement/field-unit-measurement-related-entities.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../../models/field-unit-measurement/field-unit-measurement-business-value.schema';

const FieldUnitMeasurementUpdateResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema,
);

const FieldUnitMeasurementUpdateRequestSchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
}).partial();

const FieldUnitMeasurementUpdateResponseSchema = z
  .object({
    data: FieldUnitMeasurementUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementUpdateCommand {
  export const RequestSchema = FieldUnitMeasurementUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldUnitMeasurementUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
