import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldUnitMeasurementRelatedEntitiesSchema } from '../../models/field-unit-measurement/field-unit-measurement-related-entities.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../../models/field-unit-measurement/field-unit-measurement-business-value.schema';

const FieldUnitMeasurementGetResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema,
);

const FieldUnitMeasurementGetResponseSchema = z
  .object({
    data: FieldUnitMeasurementGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementGetCommand {
  export const ResponseSchema = FieldUnitMeasurementGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
