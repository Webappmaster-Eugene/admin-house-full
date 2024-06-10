import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { FieldUnitMeasurementSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementDeleteResponseEntitySchema = FieldUnitMeasurementSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
});

const FieldUnitMeasurementDeleteResponseSchema = z
  .object({
    data: FieldUnitMeasurementDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldUnitMeasurementDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldUnitMeasurementDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
