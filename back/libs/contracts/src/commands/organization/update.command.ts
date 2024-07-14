import { z } from 'zod';
import { OrganizationSchema, ResponseClientSchema } from '../../models';
import { OrganizationBusinessValueSchema } from '../../models/organization/organization-business-value.schema';
import { OrganizationRelatedEntitiesSchema } from '../../models/organization/organization-related-entities.schema';

const OrganizationUpdateResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema);

const OrganizationUpdateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
}).partial();

const OrganizationUpdateResponseSchema = z
  .object({
    data: OrganizationUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace OrganizationUpdateCommand {
  export const RequestSchema = OrganizationUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
