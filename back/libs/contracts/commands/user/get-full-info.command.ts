import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, UserSchema } from '../../models';
import { UserFullInfoSchema } from '../../models';

const UserGetFullInfoResponseEntitySchema = UserFullInfoSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

const UserGetFullInfoResponseSchema = z
  .object({
    data: UserGetFullInfoResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserGetFullInfoCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetFullInfoResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetFullInfoResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
