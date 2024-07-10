import { z } from 'zod';
import { CategoryMaterialBusinessValueSchema, CategoryMaterialRelatedEntitiesSchema, CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetResponseEntitySchema = CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema.strict());

const CategoryMaterialGetResponseSchema = z
  .object({
    data: CategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CategoryMaterialGetCommand {
  export const ResponseSchema = CategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
