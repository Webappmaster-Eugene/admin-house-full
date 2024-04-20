import { z } from 'zod';
import { ProjectSchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const ProjectCreateRequestSchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
});

const ProjectCreateResponseSchema = z
  .object({
    data: ProjectSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ProjectCreateCommand {
  export const RequestSchema = ProjectCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
