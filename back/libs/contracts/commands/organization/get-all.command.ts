import { z } from 'zod';
import { OrganizationSchema } from '../../models';

const OrganizationGetAllResponseSchema = z.array(OrganizationSchema);

export namespace OrganizationGetAllCommand {
  export const ResponseSchema = OrganizationGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
