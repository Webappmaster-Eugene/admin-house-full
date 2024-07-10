import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { CategoryMaterialBusinessValueSchema, CategoryMaterialRelatedEntitiesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialDeleteResponseEntitySchema = CategoryMaterialBusinessValueSchema.merge(
  CategoryMaterialRelatedEntitiesSchema.strict(),
);

const CategoryMaterialDeleteResponseSchema = z
  .object({
    data: CategoryMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CategoryMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = CategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
