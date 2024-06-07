import { z } from 'zod';
import { TechLogChangesSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const TechLogChangesGetResponseSchema = z
  .object({
    data: TechLogChangesSchema.pick({
      name: true,
      entity: true,
      comment: true,
      oldInfo: true,
      newInfo: true,
      updateInfo: true,
      action: true,
      uuid: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace TechLogChangesGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = TechLogChangesGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
