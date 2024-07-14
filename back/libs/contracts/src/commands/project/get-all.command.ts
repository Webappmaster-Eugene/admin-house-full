import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { ProjectBusinessValueSchema } from '../../models/project/project-business-value.schema';
import { ProjectRelatedEntitiesSchema } from '../../models/project/project-related-entities.schema';

const ProjectGetAllResponseEntitySchema = z.array(ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema));

const ProjectGetAllResponseSchema = z
  .object({
    data: ProjectGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ProjectGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
