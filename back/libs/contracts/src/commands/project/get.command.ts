import { z } from 'zod';
import { ProjectSchema, ResponseClientSchema } from '../../models';
import { ProjectBusinessValueSchema } from '../../models/project/project-business-value.schema';
import { ProjectRelatedEntitiesSchema } from '../../models/project/project-related-entities.schema';

const ProjectGetResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema);

const ProjectSchemaGetRequestSchema = ProjectSchema.pick({
  uuid: true,
});

const ProjectSchemaGetResponseSchema = z
  .object({
    data: ProjectGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectGetCommand {
  export const BusinessValueSchema = ProjectBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const RequestSchema = ProjectSchemaGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
