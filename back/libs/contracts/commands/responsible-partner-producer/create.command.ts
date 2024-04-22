import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerCreateRequestSchema =
  ResponsiblePartnerProducerSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
  });

const ResponsiblePartnerProducerCreateResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerCreateCommand {
  export const RequestSchema = ResponsiblePartnerProducerCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
