import { z } from 'zod';
import {
  ResponsiblePartnerProducerBusinessValueSchema,
  ResponsiblePartnerProducerRelatedEntitiesSchema,
  ResponsiblePartnerProducerSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerUpdateResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema.strict(),
);

const ResponsiblePartnerProducerUpdateRequestSchema = ResponsiblePartnerProducerSchema.pick({
  name: true,
  info: true,
  phone: true,
  email: true,
  comment: true,
}).partial();

const ResponsiblePartnerProducerUpdateResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ResponsiblePartnerProducerUpdateCommand {
  export const RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
