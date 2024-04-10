import { z } from 'zod';
import { OrganizationSchema } from '../../models';

const OrganizationSchemaGetRequestSchema = OrganizationSchema.pick({
  uuid: true,
});

const OrganizationSchemaGetResponseSchema = OrganizationSchema;

export namespace OrganizationGetCommand {
  export const RequestSchema = OrganizationSchemaGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
