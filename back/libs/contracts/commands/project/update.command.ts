import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const ProjectUpdateRequestSchema = ProjectSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  responsibleManagerUuid: true,
  organizationUuid: true,
}).partial();

const ProjectUpdateResponseSchema = z
  .object({
    data: ProjectSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ProjectUpdateCommand {
  export const RequestSchema = ProjectUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
