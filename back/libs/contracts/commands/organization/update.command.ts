import { z } from 'zod';
import { OrganizationBusinessValueSchema, OrganizationRelatedEntitiesSchema, OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationUpdateResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema.strict());

const OrganizationUpdateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
}).partial();

const OrganizationUpdateResponseSchema = z
  .object({
    data: OrganizationUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace OrganizationUpdateCommand {
  export const RequestSchema = OrganizationUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
