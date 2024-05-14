import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerGetAllResponseSchema = z
  .object({
    data: z.array(
      ResponsiblePartnerProducerSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
