import { z } from 'zod';
import {
  FieldUnitMeasurementBusinessValueSchema,
  FieldUnitMeasurementRelatedEntitiesSchema,
  FieldUnitMeasurementSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementUpdateResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema.strict(),
);

const FieldUnitMeasurementUpdateRequestSchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
}).partial();

const FieldUnitMeasurementUpdateResponseSchema = z
  .object({
    data: FieldUnitMeasurementUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldUnitMeasurementUpdateCommand {
  export const RequestSchema = FieldUnitMeasurementUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldUnitMeasurementUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
