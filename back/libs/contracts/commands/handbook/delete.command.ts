import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const HandbookDeleteResponseSchema = z
  .object({
    data: HandbookSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace HandbookDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = HandbookDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
