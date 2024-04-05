import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { OrganizationSchema } from '../../models/organization';

const OrganizationCreateRequestSchema = OrganizationSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  organizationLeaderUuid: true,
  workspaceUuid: true,
});

const OrganizationCreateResponseSchema = OrganizationSchema;

export namespace OrganizationCreateCommand {
  export const RequestSchema = OrganizationCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
