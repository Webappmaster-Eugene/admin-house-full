import { z } from 'zod';
import { FieldUnitMeasurementSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldUnitMeasurementSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
