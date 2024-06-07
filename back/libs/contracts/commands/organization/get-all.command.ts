import { z } from 'zod';
import { OrganizationSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationGetAllResponseSchema = z
  .object({
    data: z.array(
      OrganizationSchema.pick({
        uuid: true,
        name: true,
        description: true,
        organizationLeaderUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace OrganizationGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = OrganizationGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
