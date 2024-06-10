import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementUpdateResponseEntitySchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
});

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
