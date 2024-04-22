import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetResponseSchema = z
  .object({
    data: CategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetCommand {
  export const ResponseSchema = CategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
