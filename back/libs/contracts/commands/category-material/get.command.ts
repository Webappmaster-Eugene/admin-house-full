import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetResponseEntitySchema = CategoryMaterialSchema.pick({
  name: true,
  templateName: true,
  comment: true,
  uuid: true,
  globalCategoryMaterialUuid: true,
  lastChangeByUserUuid: true,
});

const CategoryMaterialGetResponseSchema = z
  .object({
    data: CategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetCommand {
  export const ResponseSchema = CategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
