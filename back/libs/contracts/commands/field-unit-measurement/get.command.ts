import { z } from 'zod';
import {
  FieldUnitMeasurementBusinessValueSchema,
  FieldUnitMeasurementRelatedEntitiesSchema,
  FieldUnitMeasurementSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema.strict(),
);

const FieldUnitMeasurementGetResponseSchema = z
  .object({
    data: FieldUnitMeasurementGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldUnitMeasurementGetCommand {
  export const ResponseSchema = FieldUnitMeasurementGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
