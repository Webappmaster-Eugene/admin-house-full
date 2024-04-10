import { z } from 'zod';
import { UserSchema } from '../../models';

const AuthRegisterRequestSchema = UserSchema.omit({
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  workspaceData: true,
  creatorOfWorkspaceUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const AuthRegisterResponseSchema = UserSchema.pick({
  email: true,
  uuid: true,
}).merge(z.object({ accessToken: z.string() }));

export namespace AuthRegisterCommand {
  export const RequestSchema = AuthRegisterRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
