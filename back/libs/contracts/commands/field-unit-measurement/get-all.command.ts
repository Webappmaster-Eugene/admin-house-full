import { z } from 'zod';
import { FieldUnitMeasurementSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetAllResponseEntitySchema = z.array(
  FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    handbookUuid: true,
    lastChangeByUserUuid: true,
  }),
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
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
