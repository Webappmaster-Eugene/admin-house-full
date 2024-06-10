import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetResponseEntitySchema = MaterialSchema.pick({
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
});

const MaterialGetResponseSchema = z
  .object({
    data: MaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialGetCommand {
  export const ResponseSchema = MaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
