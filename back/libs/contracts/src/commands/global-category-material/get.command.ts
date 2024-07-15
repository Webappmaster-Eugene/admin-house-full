import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialBusinessValueSchema } from '../../models/global-category-material/global-category-business-value.schema';

const GlobalCategoryMaterialGetResponseEntitySchema = GlobalCategoryMaterialBusinessValueSchema;

const GlobalCategoryMaterialGetResponseSchema = z
  .object({
    data: GlobalCategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialGetCommand {
  export const BusinessValueSchema = GlobalCategoryMaterialBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
