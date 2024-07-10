import { z } from 'zod';
import { ProjectBusinessValueSchema, ProjectRelatedEntitiesSchema, ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectUpdateResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema.strict());

const ProjectUpdateRequestSchema = ProjectSchema.pick({
  name: true,
  customerMail: true,
  customerUuid: true,
  description: true,
}).partial();

const ProjectUpdateResponseSchema = z
  .object({
    data: ProjectUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ProjectUpdateCommand {
  export const RequestSchema = ProjectUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
