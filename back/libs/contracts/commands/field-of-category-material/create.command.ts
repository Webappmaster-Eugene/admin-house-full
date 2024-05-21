import { z } from 'zod';
import { FieldOfCategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialCreateRequestSchema = FieldOfCategoryMaterialSchema.omit({
  uuid: true,
  createdByUuid: true,
  handbookUuid: true,
  createdAt: true,
  updatedAt: true,
});

const FieldOfCategoryMaterialCreateResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialCreateCommand {
  export const RequestSchema = FieldOfCategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
