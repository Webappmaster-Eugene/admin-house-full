import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema';
import { CategoryMaterialRelatedEntitiesSchema } from '../../models/category-material/category-material-related-entities.schema';

const CategoryMaterialUpdateResponseEntitySchema = CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema);

const CategoryMaterialUpdateRequestSchema = CategoryMaterialSchema.pick({
  name: true,
  comment: true,
  templateName: true,
}).partial();

const CategoryMaterialUpdateResponseSchema = z
  .object({
    data: CategoryMaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialUpdateCommand {
  export const RequestSchema = CategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
