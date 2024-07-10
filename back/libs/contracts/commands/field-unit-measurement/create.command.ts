import { z } from 'zod';
import { FieldUnitMeasurementRelatedEntitiesSchema, FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementCreateResponseEntitySchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
}).merge(FieldUnitMeasurementRelatedEntitiesSchema.strict());

const FieldUnitMeasurementCreateRequestSchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
});

const FieldUnitMeasurementCreateResponseSchema = z
  .object({
    data: FieldUnitMeasurementCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldUnitMeasurementCreateCommand {
  export const RequestSchema = FieldUnitMeasurementCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldUnitMeasurementCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
