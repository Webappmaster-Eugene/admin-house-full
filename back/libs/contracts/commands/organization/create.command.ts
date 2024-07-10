import { z } from 'zod';
import { OrganizationBusinessValueSchema, OrganizationRelatedEntitiesSchema, OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationCreateResponseEntitySchema = OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema.strict());

const OrganizationCreateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
});

const OrganizationCreateResponseSchema = z
  .object({
    data: OrganizationCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace OrganizationCreateCommand {
  export const RequestSchema = OrganizationCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
