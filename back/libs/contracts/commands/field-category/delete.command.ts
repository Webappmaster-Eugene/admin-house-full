import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { FieldCategorySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldCategoryDeleteResponseSchema = z
  .object({
    data: FieldCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldCategoryDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldCategoryDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
