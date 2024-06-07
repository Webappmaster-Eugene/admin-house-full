import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

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
}
