import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { TypeFieldSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TypeFieldDeleteResponseSchema = z
  .object({
    data: TypeFieldSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace TypeFieldDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = TypeFieldDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
