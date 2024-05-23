import { z } from 'zod';
import { FieldOfCategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialUpdateRequestSchema = FieldOfCategoryMaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  handbookUuid: true,
  createdByUuid: true,
  categoryMaterialUuid: true,
}).partial();

const FieldOfCategoryMaterialUpdateResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialUpdateCommand {
  export const RequestSchema = FieldOfCategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
