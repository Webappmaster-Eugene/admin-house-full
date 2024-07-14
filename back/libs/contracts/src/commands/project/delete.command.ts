import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { ProjectBusinessValueSchema } from '../../models/project/project-business-value.schema';
import { ProjectRelatedEntitiesSchema } from '../../models/project/project-related-entities.schema';

const ProjectDeleteResponseEntitySchema = ProjectBusinessValueSchema.merge(ProjectRelatedEntitiesSchema);

const ProjectDeleteResponseSchema = z
  .object({
    data: ProjectDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = ProjectDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
