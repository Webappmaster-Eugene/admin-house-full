import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialGetResponseSchema = z
  .object({
    data: GlobalCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialGetCommand {
  export const ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
