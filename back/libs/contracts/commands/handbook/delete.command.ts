import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookDeleteResponseSchema = z
  .object({
    data: HandbookSchema.pick({
      name: true,
      description: true,
      canCustomerView: true,
      uuid: true,
      responsibleManagerUuid: true,
      workspaceUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace HandbookDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = HandbookDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
