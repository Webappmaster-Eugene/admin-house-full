import { z } from 'zod';
import { OrganizationSchema } from '../../models';

const OrganizationSchemaDeleteManyRequestSchema = OrganizationSchema.pick({
  uuid: true,
});

const OrganizationSchemaDeleteManyResponseSchema = z.object({
  deletedWorkspace: z.array(OrganizationSchema),
  count: z.number(),
});

export namespace OrganizationSchemaDeleteManyCommand {
  export const RequestSchema = OrganizationSchemaDeleteManyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = OrganizationSchemaDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
