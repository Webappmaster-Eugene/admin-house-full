import { z } from 'zod';
import { ResponseClientSchema, ResponsiblePartnerProducerSchema } from '../../models';
import { ResponsiblePartnerProducerRelatedEntitiesSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema';

const ResponsiblePartnerProducerGetResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema,
);

const ResponsiblePartnerProducerGetResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerSchema.pick({
      name: true,
      comment: true,
      info: true,
      email: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      uuid: true,
      handbookUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerGetCommand {
  export const ResponseSchema = ResponsiblePartnerProducerGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
