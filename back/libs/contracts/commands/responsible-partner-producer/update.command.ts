import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerUpdateRequestSchema = ResponsiblePartnerProducerSchema.omit({
  createdAt: true,
  handbookId: true,
  updatedAt: true,
  uuid: true,
}).partial();

const ResponsiblePartnerProducerUpdateResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerUpdateCommand {
  export const RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
