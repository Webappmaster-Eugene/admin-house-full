import { z } from 'zod';
import {
  CategoryMaterialBusinessValueSchema,
  CategoryMaterialRelatedEntitiesSchema,
  CategoryMaterialSchema,
  RequestGetAllQuerySchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetAllResponseEntitySchema = z.array(
  CategoryMaterialBusinessValueSchema.merge(CategoryMaterialRelatedEntitiesSchema.strict()),
);

const CategoryMaterialGetAllResponseSchema = z
  .object({
    data: CategoryMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace CategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CategoryMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
