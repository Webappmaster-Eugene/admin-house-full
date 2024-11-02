import { z } from 'zod';
import { FieldUnitMeasurementSchema, ResponseClientSchema } from '../../models';
import { FieldUnitMeasurementRelatedEntitiesSchema } from '../../models/field-unit-measurement/field-unit-measurement-related-entities.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../../models/field-unit-measurement/field-unit-measurement-business-value.schema';

const FieldUnitMeasurementCreateRequestSchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
  fieldUnitMeasurementStatus: true,
});

const FieldUnitMeasurementCreateResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema,
);

const FieldUnitMeasurementCreateResponseSchema = z
  .object({
    data: FieldUnitMeasurementCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementCreateCommand {
  export const RequestSchema = FieldUnitMeasurementCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldUnitMeasurementCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
