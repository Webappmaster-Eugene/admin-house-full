import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceDeleteResponseSchema = z
  .object({
    data: StatusResourceSchema.pick({
      name: true,
      comment: true,
      uuid: true,
      lastChangeByUserUuid: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = StatusResourceDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
