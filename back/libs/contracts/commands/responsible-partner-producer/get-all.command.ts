import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponsiblePartnerProducerSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerGetAllResponseEntitySchema = z.array(
  ResponsiblePartnerProducerSchema.pick({
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
);

const ResponsiblePartnerProducerGetAllResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
