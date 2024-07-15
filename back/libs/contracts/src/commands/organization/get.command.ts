import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { OrganizationBusinessValueSchema } from '../../models/organization/organization-business-value.schema';
import { OrganizationRelatedEntitiesSchema } from '../../models/organization/organization-related-entities.schema';

const OrganizationGetResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema);

const OrganizationSchemaGetResponseSchema = z
  .object({
    data: OrganizationGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace OrganizationGetCommand {
  export const BusinessValueSchema = OrganizationBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = OrganizationSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
