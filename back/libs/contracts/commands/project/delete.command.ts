import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const ProjectDeleteResponseEntitySchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
  customerUuid: true,
  createdAt: true,
  updatedAt: true,
  uuid: true,
  responsibleManagerUuid: true,
  organizationUuid: true,
  lastChangeByUserUuid: true,
});

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
