import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { HandbookSchema } from '../../models';

const HandbookDeleteResponseSchema = HandbookSchema.pick({ uuid: true });

export namespace HandbookDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = HandbookDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
