import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetResponseSchema = z
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

export namespace MaterialGetCommand {
  export const ResponseSchema = MaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
