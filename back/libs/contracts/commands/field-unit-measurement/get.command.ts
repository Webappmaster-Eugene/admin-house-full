import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetResponseSchema = z
  .object({
    data: FieldUnitMeasurementSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementGetCommand {
  export const ResponseSchema = FieldUnitMeasurementGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
