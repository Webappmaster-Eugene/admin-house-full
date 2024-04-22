import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialUpdateRequestSchema = MaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  categoryUuid: true,
  handbookUuid: true,
  responsiblePartnerUuid: true,
  unitMeasurementUuid: true,
}).partial();

const MaterialUpdateResponseSchema = z
  .object({
    data: MaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace MaterialUpdateCommand {
  export const RequestSchema = MaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = MaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
