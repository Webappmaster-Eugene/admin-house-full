import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { OrganizationBusinessValueSchema } from '../../models/organization/organization-business-value.schema';
import { OrganizationRelatedEntitiesSchema } from '../../models/organization/organization-related-entities.schema';

const OrganizationGetAllResponseEntitySchema = z.array(OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema));

const OrganizationGetAllResponseSchema = z
  .object({
    data: OrganizationGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace OrganizationGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = OrganizationGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
