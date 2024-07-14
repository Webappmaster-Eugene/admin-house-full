import { z } from 'zod';
import { RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema';
import { CategoryMaterialRelatedEntitiesSchema } from '../../models/category-material/category-material-related-entities.schema';

const CategoryMaterialGetAllResponseEntitySchema = z.array(
  CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema),
);

const CategoryMaterialGetAllResponseSchema = z
  .object({
    data: CategoryMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CategoryMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
