import { z } from 'zod';
import {
  FieldOfCategoryMaterialBusinessValueSchema,
  FieldOfCategoryMaterialRelatedEntitiesSchema,
  FieldOfCategoryMaterialSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetResponseEntitySchema = FieldOfCategoryMaterialBusinessValueSchema.merge(
  FieldOfCategoryMaterialRelatedEntitiesSchema.strict(),
);

const FieldOfCategoryMaterialGetResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldOfCategoryMaterialGetCommand {
  export const ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
