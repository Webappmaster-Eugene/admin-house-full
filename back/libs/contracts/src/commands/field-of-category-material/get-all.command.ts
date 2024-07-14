import { z } from 'zod';
import { RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../../models/field-of-category-material/field-of-category-material-business-value.schema';
import { FieldOfCategoryMaterialRelatedEntitiesSchema } from '../../models/field-of-category-material/field-of-category-material-related-entities.schema';

const FieldOfCategoryMaterialGetAllResponseEntitySchema = z.array(
  FieldOfCategoryMaterialBusinessValueSchema.merge(FieldOfCategoryMaterialRelatedEntitiesSchema),
);

const FieldOfCategoryMaterialGetAllResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldOfCategoryMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
