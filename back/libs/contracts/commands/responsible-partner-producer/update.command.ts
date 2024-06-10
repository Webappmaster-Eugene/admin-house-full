import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerUpdateResponseEntitySchema = ResponsiblePartnerProducerSchema.omit({
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
});

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
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerUpdateCommand {
  export const RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
