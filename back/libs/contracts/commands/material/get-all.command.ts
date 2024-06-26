import { z } from 'zod';
import { MaterialSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetAllResponseEntitySchema = z.array(
  MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
    categoryUuid: true,
    handbookUuid: true,
    lastChangeByUserUuid: true,
    uuid: true,
  }),
);

const MaterialGetAllResponseSchema = z
  .object({
    data: MaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = MaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
