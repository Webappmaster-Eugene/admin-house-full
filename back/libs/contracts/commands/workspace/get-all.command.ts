import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const WorkspaceGetAllResponseSchema = z
  .object({
    data: z.array(
      WorkspaceSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceGetAllCommand {
  export const ResponseSchema = WorkspaceGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
