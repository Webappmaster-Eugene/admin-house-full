import { z } from 'zod';
import { ProjectSchema, ResponseClientSchema } from '../../models';
import { ProjectRelatedEntitiesSchema } from '../../models/project/project-related-entities.schema';
import { ProjectBusinessValueSchema } from '../../models/project/project-business-value.schema';

const ProjectUpdateResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema);

const ProjectUpdateRequestSchema = ProjectSchema.pick({
  name: true,
  customerMail: true,
  customerUuid: true,
  description: true,
  projectStatus: true,
  responsibleManagerUuid: true,
  organizationUuid: true,
}).partial();

const ProjectUpdateResponseSchema = z
  .object({
    data: ProjectUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectUpdateCommand {
  export const RequestSchema = ProjectUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
