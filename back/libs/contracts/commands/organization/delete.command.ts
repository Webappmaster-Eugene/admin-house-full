import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationDeleteResponseEntitySchema = OrganizationSchema.pick({
  uuid: true,
  name: true,
  description: true,
  organizationLeaderUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});

const OrganizationDeleteResponseSchema = z
  .object({
    data: OrganizationDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace OrganizationDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = OrganizationDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
