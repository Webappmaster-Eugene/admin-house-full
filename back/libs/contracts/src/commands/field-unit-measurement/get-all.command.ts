import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { FieldUnitMeasurementRelatedEntitiesSchema } from '../../models/field-unit-measurement/field-unit-measurement-related-entities.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../../models/field-unit-measurement/field-unit-measurement-business-value.schema';

const FieldUnitMeasurementGetAllResponseEntitySchema = z.array(
  FieldUnitMeasurementBusinessValueSchema.merge(FieldUnitMeasurementRelatedEntitiesSchema),
);

const FieldUnitMeasurementGetAllResponseSchema = z
  .object({
    data: FieldUnitMeasurementGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
