import { z } from 'zod';
import { WorkspaceSchema } from '../../models';

const WorkspaceAddUserToManagerRequestSchema = WorkspaceSchema.pick({
  workspaceCreatorUuid: true,
});

const WorkspaceAddUserToManagerResponseSchema = WorkspaceSchema.pick({
  uuid: true,
});

export namespace WorkspaceAddUserToManagerCommand {
  export const RequestSchema = WorkspaceAddUserToManagerRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceAddUserToManagerResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
