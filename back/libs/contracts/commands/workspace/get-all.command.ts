import { z } from 'zod';
import { WorkspaceSchema } from '../../models/workspace';

const WorkspaceGetAllResponseSchema = z.array(WorkspaceSchema);

export namespace WorkspaceGetAllCommand {
  export const ResponseSchema = WorkspaceGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
