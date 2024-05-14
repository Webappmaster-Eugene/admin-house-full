import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementUpdateRequestSchema = FieldUnitMeasurementSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
}).partial();

const FieldUnitMeasurementUpdateResponseSchema = z
  .object({
    data: FieldUnitMeasurementSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementUpdateCommand {
  export const RequestSchema = FieldUnitMeasurementUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldUnitMeasurementUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
