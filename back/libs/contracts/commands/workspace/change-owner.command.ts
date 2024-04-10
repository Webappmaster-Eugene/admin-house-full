import { z } from 'zod';
import { WorkspaceSchema } from '../../models';

const WorkspaceChangeOwnerRequestSchema = WorkspaceSchema.pick({
  workspaceCreatorUuid: true,
});

const WorkspaceChangeOwnerResponseSchema = WorkspaceSchema.pick({ uuid: true });

export namespace WorkspaceChangeOwnerCommand {
  export const RequestSchema = WorkspaceChangeOwnerRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceChangeOwnerResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
