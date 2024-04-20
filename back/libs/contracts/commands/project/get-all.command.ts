import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

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
  export const ResponseSchema = ProjectGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
