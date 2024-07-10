import { z } from 'zod';
import {
  RequestGetAllQuerySchema,
  ResponsiblePartnerProducerBusinessValueSchema,
  ResponsiblePartnerProducerRelatedEntitiesSchema,
  ResponsiblePartnerProducerSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerGetAllResponseEntitySchema = z.array(
  ResponsiblePartnerProducerBusinessValueSchema.merge(ResponsiblePartnerProducerRelatedEntitiesSchema.strict()),
);

const ResponsiblePartnerProducerGetAllResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ResponsiblePartnerProducerGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
