import { z } from 'zod';
import { FieldOfCategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetCommand {
  export const ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
