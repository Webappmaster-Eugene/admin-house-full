import { z } from 'zod';
import { ResponseClientSchema, ResponsiblePartnerProducerSchema } from '../../models';
import { ResponsiblePartnerProducerRelatedEntitiesSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema';

const ResponsiblePartnerProducerCreateResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema,
);

const ResponsiblePartnerProducerCreateRequestSchema = ResponsiblePartnerProducerSchema.pick({
  name: true,
  comment: true,
  info: true,
  email: true,
  phone: true,
  responsiblePartnerProducerStatus: true,
});

const ResponsiblePartnerProducerCreateResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerCreateCommand {
  export const RequestSchema = ResponsiblePartnerProducerCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
