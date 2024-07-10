import { z } from 'zod';
import { OrganizationSchema, ResponseClientSchema } from '../../models';

const OrganizationDeleteManyResponseEntitySchema = z.array(OrganizationSchema);

const OrganizationSchemaDeleteManyRequestSchema = z.array(
  OrganizationSchema.pick({
    uuid: true,
  }),
);

const OrganizationSchemaDeleteManyResponseSchema = z
  .object({
    data: z.object({
      deletedOrganizations: OrganizationDeleteManyResponseEntitySchema,
      count: z.number(),
    }),
  })
  .merge(ResponseClientSchema.strict());

export namespace OrganizationSchemaDeleteManyCommand {
  export const RequestSchema = OrganizationSchemaDeleteManyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationSchemaDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationDeleteManyResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
