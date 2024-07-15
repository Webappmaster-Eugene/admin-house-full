import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema';
import { CategoryMaterialRelatedEntitiesSchema } from '../../models/category-material/category-material-related-entities.schema';

const CategoryMaterialGetResponseEntitySchema = CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema);

const CategoryMaterialGetResponseSchema = z
  .object({
    data: CategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetCommand {
  export const BusinessValueSchema = CategoryMaterialBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = CategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
