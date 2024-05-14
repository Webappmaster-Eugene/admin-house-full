import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { UserFullInfoSchema } from '../../models';

const UserGetFullInfoResponseSchema = z
  .object({
    data: UserFullInfoSchema.omit({
      password: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace UserGetFullInfoCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetFullInfoResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
