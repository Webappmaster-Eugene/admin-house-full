import { z } from 'zod';
import { ProjectSchema, ResponseClientSchema } from '../../models';
import { ProjectBusinessValueSchema } from '../../models/project/project-business-value.schema';
import { ProjectRelatedEntitiesSchema } from '../../models/project/project-related-entities.schema';

const ProjectCreateResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema);

const ProjectCreateRequestSchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
  customerUuid: true,
  projectStatus: true,
});

const ProjectCreateResponseSchema = z
  .object({
    data: ProjectCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectCreateCommand {
  export const RequestSchema = ProjectCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
