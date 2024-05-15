import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { FieldOfMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfMaterialDeleteResponseSchema = z
  .object({
    data: FieldOfMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldOfMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
