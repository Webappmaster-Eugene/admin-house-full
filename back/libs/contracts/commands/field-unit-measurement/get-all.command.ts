import { z } from 'zod';
import {
  FieldUnitMeasurementBusinessValueSchema,
  FieldUnitMeasurementRelatedEntitiesSchema,
  FieldUnitMeasurementSchema,
  RequestGetAllQuerySchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetAllResponseEntitySchema = z.array(
  FieldUnitMeasurementBusinessValueSchema.merge(FieldUnitMeasurementRelatedEntitiesSchema.strict()),
);

const FieldUnitMeasurementGetAllResponseSchema = z
  .object({
    data: FieldUnitMeasurementGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldUnitMeasurementGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
