import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const AddUserToOrganizationRequestSchema = UserSchema.pick({
  uuid: true,
});

const AddUserToOrganizationResponseSchema = z
  .object({
    data: UserSchema,
  })
  .merge(ResponseClientSchema);

export namespace AddUserToOrganizationCommand {
  export const RequestSchema = AddUserToOrganizationRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AddUserToOrganizationResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
