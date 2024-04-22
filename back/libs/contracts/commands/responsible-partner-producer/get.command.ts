import { z } from 'zod';
import { ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerGetResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerGetCommand {
  export const ResponseSchema = ResponsiblePartnerProducerGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
