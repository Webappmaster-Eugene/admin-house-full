import { z } from 'zod';
import { MaterialRelatedEntitiesSchema, MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialUpdateResponseEntitySchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
  categoryMaterialUuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
  uuid: true,
}).merge(MaterialRelatedEntitiesSchema);

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
    data: MaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialUpdateCommand {
  export const RequestSchema = MaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
