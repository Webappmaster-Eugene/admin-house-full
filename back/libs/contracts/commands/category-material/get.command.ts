import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetResponseSchema = z
  .object({
    data: CategoryMaterialSchema.pick({
      name: true,
      templateName: true,
      comment: true,
      uuid: true,
      globalCategoryMaterialUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetCommand {
  export const ResponseSchema = CategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
