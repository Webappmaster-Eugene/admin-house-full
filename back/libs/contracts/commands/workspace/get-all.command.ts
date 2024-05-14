import { z } from 'zod';
import { RequestGetAllQuerySchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

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
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = WorkspaceGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
