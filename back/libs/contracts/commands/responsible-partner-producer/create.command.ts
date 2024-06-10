import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerCreateResponseEntitySchema = ResponsiblePartnerProducerSchema.pick({
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

const ResponsiblePartnerProducerCreateRequestSchema = ResponsiblePartnerProducerSchema.pick({
  name: true,
  comment: true,
  info: true,
  email: true,
  phone: true,
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
