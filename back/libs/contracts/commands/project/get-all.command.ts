import { z } from 'zod';
import { ProjectSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectGetAllResponseSchema = z
  .object({
    data: z.array(
      ProjectSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace ProjectGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ProjectGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
