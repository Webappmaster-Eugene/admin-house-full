import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeDeleteResponseEntitySchema = FieldTypeSchema.pick({
  name: true,
  description: true,
  jsType: true,
  lastChangeByUserUuid: true,
  uuid: true,
});

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
