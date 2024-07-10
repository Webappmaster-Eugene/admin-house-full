import { z } from 'zod';
import { OrganizationBusinessValueSchema, OrganizationRelatedEntitiesSchema, OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationGetResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema.strict());

const OrganizationSchemaGetResponseSchema = z
  .object({
    data: OrganizationGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace OrganizationGetCommand {
  export const ResponseSchema = OrganizationSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
