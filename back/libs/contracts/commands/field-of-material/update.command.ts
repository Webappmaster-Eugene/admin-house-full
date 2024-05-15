import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfMaterialUpdateRequestSchema = FieldOfMaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
}).partial();

const FieldOfMaterialUpdateResponseSchema = z
  .object({
    data: FieldOfMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfMaterialUpdateCommand {
  export const RequestSchema = FieldOfMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldOfMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
