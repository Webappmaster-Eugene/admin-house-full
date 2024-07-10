import { z } from 'zod';
import { ProjectBusinessValueSchema, ProjectRelatedEntitiesSchema, ProjectSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const ProjectDeleteResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema.strict());

const ProjectDeleteResponseSchema = z
  .object({
    data: ProjectDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ProjectDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = ProjectDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
