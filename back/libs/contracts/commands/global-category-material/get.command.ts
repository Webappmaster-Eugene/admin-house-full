import { z } from 'zod';
import { GlobalCategoryMaterialBusinessValueSchema, ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialGetResponseEntitySchema = GlobalCategoryMaterialBusinessValueSchema;

const GlobalCategoryMaterialGetResponseSchema = z
  .object({
    data: GlobalCategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace GlobalCategoryMaterialGetCommand {
  export const ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
