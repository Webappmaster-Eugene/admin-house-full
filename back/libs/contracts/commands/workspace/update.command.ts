import { z } from 'zod';
import { WorkspaceCreateCommand } from './create.command';
import { UserSchema } from '../../models/user';
import { WorkspaceSchema } from '../../models/workspace';
import { RoleSchema } from '../../models/role';

const WorkspaceUpdateRequestSchema = WorkspaceSchema.omit({
  createdAt: true,
  updatedAt: true,
  handbookOfWorkspaceUuid: true,
  workspaceCreatorUuid: true,
}).partial();

const WorkspaceUpdateResponseSchema = WorkspaceSchema.pick({ uuid: true });

export namespace WorkspaceUpdateCommand {
  export const RequestSchema = WorkspaceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
