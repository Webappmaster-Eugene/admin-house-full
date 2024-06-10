import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialCreateResponseEntitySchema = MaterialSchema.pick({
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

const MaterialCreateRequestSchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
});

const MaterialCreateResponseSchema = z
  .object({
    data: MaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialCreateCommand {
  export const RequestSchema = MaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
