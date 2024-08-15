import { z } from 'zod';
import { OrganizationSchema, ResponseClientSchema } from '../../models';
import { OrganizationBusinessValueSchema } from '../../models/organization/organization-business-value.schema';
import { OrganizationRelatedEntitiesSchema } from '../../models/organization/organization-related-entities.schema';

const OrganizationCreateResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema);

const OrganizationCreateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
  organizationStatus: true,
});

const OrganizationCreateResponseSchema = z
  .object({
    data: OrganizationCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace OrganizationCreateCommand {
  export const RequestSchema = OrganizationCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
