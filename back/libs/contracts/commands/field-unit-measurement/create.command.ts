import { z } from 'zod';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementCreateRequestSchema = FieldUnitMeasurementSchema.omit(
  {
    uuid: true,
    createdAt: true,
    updatedAt: true,
  },
);

const FieldUnitMeasurementCreateResponseSchema = z
  .object({
    data: FieldUnitMeasurementSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementCreateCommand {
  export const RequestSchema = FieldUnitMeasurementCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldUnitMeasurementCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
