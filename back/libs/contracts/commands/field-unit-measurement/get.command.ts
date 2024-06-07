import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementGetResponseSchema = z
  .object({
    data: FieldUnitMeasurementSchema.pick({
      name: true,
      comment: true,
      uuid: true,
      handbookUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementGetCommand {
  export const ResponseSchema = FieldUnitMeasurementGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
