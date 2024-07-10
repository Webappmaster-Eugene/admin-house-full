import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { OrganizationBusinessValueSchema, OrganizationRelatedEntitiesSchema, OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationDeleteResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema.strict());

const OrganizationDeleteResponseSchema = z
  .object({
    data: OrganizationDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace OrganizationDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = OrganizationDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
