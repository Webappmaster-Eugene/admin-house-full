import { z } from 'zod';
import { WorkspaceSchema } from '../../models';

const WorkspaceDeleteManyRequestSchema = WorkspaceSchema.pick({
  uuid: true,
});

const WorkspaceDeleteManyResponseSchema = z.object({
  deletedWorkspace: z.array(WorkspaceSchema),
  count: z.number(),
});

export namespace WorkspaceDeleteManyCommand {
  export const RequestSchema = WorkspaceDeleteManyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
