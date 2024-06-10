import { z } from 'zod';
import { ResponseClientSchema, UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserDeleteResponseEntitySchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

const UserDeleteResponseSchema = z
  .object({
    data: UserDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
