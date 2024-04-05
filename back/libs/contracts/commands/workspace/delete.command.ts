import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { WorkspaceSchema } from '../../models/workspace';

const WorkspaceDeleteRequestSchema = WorkspaceSchema.pick({
  uuid: true,
});

const WorkspaceDeleteResponseSchema = z.object({
  deletedWorkspaces: z.array(WorkspaceSchema),
  count: z.number(),
});

export namespace WorkspaceDeleteCommand {
  export const RequestSchema = WorkspaceDeleteRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
