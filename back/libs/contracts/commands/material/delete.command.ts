import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialDeleteResponseSchema = z
  .object({
    data: MaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace MaterialDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = MaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
