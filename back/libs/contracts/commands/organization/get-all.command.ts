import { z } from 'zod';
import { OrganizationSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationGetAllResponseEntitySchema = z.array(
  OrganizationSchema.pick({
    uuid: true,
    name: true,
    description: true,
    organizationLeaderUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
  }),
);

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
