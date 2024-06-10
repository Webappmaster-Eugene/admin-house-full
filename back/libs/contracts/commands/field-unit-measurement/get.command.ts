import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetResponseEntitySchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
});

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
