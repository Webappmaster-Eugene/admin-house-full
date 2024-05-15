import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeDeleteResponseSchema = z
  .object({
    data: FieldTypeSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldTypeDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
