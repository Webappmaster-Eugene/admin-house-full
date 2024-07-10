import { z } from 'zod';
import { ProjectBusinessValueSchema, ProjectRelatedEntitiesSchema, ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectCreateResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema.strict());

const ProjectCreateRequestSchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
  customerUuid: true,
});

const ProjectCreateResponseSchema = z
  .object({
    data: ProjectCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ProjectCreateCommand {
  export const RequestSchema = ProjectCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
