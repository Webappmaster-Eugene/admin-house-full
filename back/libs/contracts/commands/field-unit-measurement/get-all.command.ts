import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
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
  export const ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
