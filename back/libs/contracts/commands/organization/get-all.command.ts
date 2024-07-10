import { z } from 'zod';
import {
  OrganizationBusinessValueSchema,
  OrganizationRelatedEntitiesSchema,
  OrganizationSchema,
  RequestGetAllQuerySchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const OrganizationGetAllResponseEntitySchema = z.array(OrganizationBusinessValueSchema.merge(OrganizationRelatedEntitiesSchema.strict()));

const OrganizationGetAllResponseSchema = z
  .object({
    data: OrganizationGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace OrganizationGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = OrganizationGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = OrganizationGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
