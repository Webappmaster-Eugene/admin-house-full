import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { OrganizationBusinessValueSchema } from '../../models/organization/organization-business-value.schema';
import { OrganizationRelatedEntitiesSchema } from '../../models/organization/organization-related-entities.schema';

const OrganizationDeleteResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema);

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
