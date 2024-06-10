import { z } from 'zod';
import { OrganizationSchema, PriceChangingSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationCreateResponseEntitySchema = OrganizationSchema.pick({
  uuid: true,
  name: true,
  description: true,
  organizationLeaderUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});

const OrganizationCreateRequestSchema = OrganizationSchema.pick({
  name: true,
  description: true,
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
