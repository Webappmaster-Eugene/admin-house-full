import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema.js';
import { CategoryMaterialRelatedEntitiesSchema } from '../../models/category-material/category-material-related-entities.schema';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const CategoryMaterialDeleteManyResponseEntitySchema = z.array(
  CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema),
);

const CategoryMaterialDeleteManyRequestSchema = z.array(EntityUrlParamCommand.RequestUuidParamSchema);

const CategoryMaterialDeleteManyResponseSchema = z
  .object({
    data: CategoryMaterialDeleteManyResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialDeleteManyCommand {
  export const RequestSchema = CategoryMaterialDeleteManyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialDeleteManyResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
