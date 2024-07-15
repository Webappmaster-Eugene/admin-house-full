import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldOfCategoryMaterialRelatedEntitiesSchema } from '../../models/field-of-category-material/field-of-category-material-related-entities.schema';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../../models/field-of-category-material/field-of-category-material-business-value.schema';

const FieldOfCategoryMaterialGetResponseEntitySchema = FieldOfCategoryMaterialBusinessValueSchema.merge(
  FieldOfCategoryMaterialRelatedEntitiesSchema,
);

const FieldOfCategoryMaterialGetResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetCommand {
  export const BusinessValueSchema = FieldOfCategoryMaterialBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
