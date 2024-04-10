import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const ProjectDeleteResponseSchema = ProjectSchema.pick({ uuid: true });

export namespace ProjectDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = ProjectDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
