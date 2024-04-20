import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models/response-client';

const ProjectDeleteResponseSchema = z
  .object({
    data: ProjectSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ProjectDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = ProjectDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
