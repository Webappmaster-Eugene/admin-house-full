import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import {
  FieldUnitMeasurementBusinessValueSchema,
  FieldUnitMeasurementRelatedEntitiesSchema,
  FieldUnitMeasurementSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldUnitMeasurementDeleteResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema.strict(),
);

const FieldUnitMeasurementDeleteResponseSchema = z
  .object({
    data: FieldUnitMeasurementDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldUnitMeasurementDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldUnitMeasurementDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldUnitMeasurementDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
