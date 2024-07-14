import { z } from 'zod';
import { EntityUrlParamCommand } from '../../commands/common';
import { ResponseClientSchema } from '../../models';
import { FieldUnitMeasurementBusinessValueSchema } from '../../models/field-unit-measurement/field-unit-measurement-business-value.schema';
import { FieldUnitMeasurementRelatedEntitiesSchema } from '../../models/field-unit-measurement/field-unit-measurement-related-entities.schema';

const FieldUnitMeasurementDeleteResponseEntitySchema = FieldUnitMeasurementBusinessValueSchema.merge(
  FieldUnitMeasurementRelatedEntitiesSchema,
);

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
