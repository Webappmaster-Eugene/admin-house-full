import { z } from 'zod';
import { CategoryMaterialSchema, ResponseClientSchema } from '../../models';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema';
import { CategoryMaterialRelatedEntitiesSchema } from '../../models/category-material/category-material-related-entities.schema';
import { CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema } from '../../models/category-material/category-material-data-with-fields-of-category-materials.schema';

const CategoryMaterialCreateResponseEntitySchema = CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema);

const CategoryMaterialCreateRequestSchema = CategoryMaterialSchema.pick({
  name: true,
  comment: true,
  templateName: true,
  categoryMaterialStatus: true,
  globalCategoryMaterialUuid: true,
}).merge(CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema);

const CategoryMaterialCreateResponseSchema = z
  .object({
    data: CategoryMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialCreateCommand {
  export const RequestSchema = CategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
