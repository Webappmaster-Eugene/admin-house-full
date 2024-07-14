import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { FieldTypeBusinessValueSchema } from '../../models/field-type/field-type-business-value.schema';

const FieldTypeDeleteResponseEntitySchema = FieldTypeBusinessValueSchema;

const FieldTypeDeleteResponseSchema = z
  .object({
    data: FieldTypeDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldTypeDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
