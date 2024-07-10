import { z } from 'zod';
import { ProjectBusinessValueSchema, ProjectRelatedEntitiesSchema, ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectGetResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema.strict());

const ProjectSchemaGetRequestSchema = ProjectSchema.pick({
  uuid: true,
});

const ProjectSchemaGetResponseSchema = z
  .object({
    data: ProjectGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ProjectGetCommand {
  export const RequestSchema = ProjectSchemaGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
