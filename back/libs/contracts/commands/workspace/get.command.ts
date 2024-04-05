import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { WorkspaceSchema } from '../../models/workspace';

const WorkspaceGetRequestSchema = WorkspaceSchema.pick({
  uuid: true,
});

const WorkspaceGetResponseSchema = WorkspaceSchema;

export namespace WorkspaceGetCommand {
  export const RequestSchema = WorkspaceGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
