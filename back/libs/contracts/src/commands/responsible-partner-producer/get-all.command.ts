import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema';
import { ResponsiblePartnerProducerRelatedEntitiesSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema';

const ResponsiblePartnerProducerGetAllResponseEntitySchema = z.array(
  ResponsiblePartnerProducerBusinessValueSchema.merge(ResponsiblePartnerProducerRelatedEntitiesSchema),
);

const ResponsiblePartnerProducerGetAllResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
