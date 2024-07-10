import { z } from 'zod';
import { ProjectBusinessValueSchema, ProjectRelatedEntitiesSchema, ProjectSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectGetAllResponseEntitySchema = z.array(ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema.strict()));

const ProjectGetAllResponseSchema = z
  .object({
    data: ProjectGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ProjectGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ProjectGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
