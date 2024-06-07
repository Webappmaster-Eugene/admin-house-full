import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialUpdateRequestSchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
}).partial();

const MaterialUpdateResponseSchema = z
  .object({
    data: MaterialSchema.pick({
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
  })
  .merge(ResponseClientSchema);

export namespace MaterialUpdateCommand {
  export const RequestSchema = MaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
