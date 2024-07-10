import { z } from 'zod';
import {
  ResponsiblePartnerProducerBusinessValueSchema,
  ResponsiblePartnerProducerRelatedEntitiesSchema,
  ResponsiblePartnerProducerSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerGetResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema.strict(),
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
  .merge(ResponseClientSchema.strict());

export namespace ResponsiblePartnerProducerGetCommand {
  export const ResponseSchema = ResponsiblePartnerProducerGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
