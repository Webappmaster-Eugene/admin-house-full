import { z } from 'zod';
import { ResponseClientSchema, ResponsiblePartnerProducerSchema } from '../../models';
import { ResponsiblePartnerProducerRelatedEntitiesSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema';

const ResponsiblePartnerProducerUpdateResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema,
);

const ResponsiblePartnerProducerUpdateRequestSchema = ResponsiblePartnerProducerSchema.pick({
  name: true,
  info: true,
  phone: true,
  email: true,
  comment: true,
  responsiblePartnerProducerStatus: true,
}).partial();

const ResponsiblePartnerProducerUpdateResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerUpdateCommand {
  export const RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
