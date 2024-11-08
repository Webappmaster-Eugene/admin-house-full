import { z } from 'zod';
import { GlobalCategoryMaterialBusinessValueSchema } from '../../models/global-category-material/global-category-business-value.schema';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';

const GlobalCategoryMaterialGetAllResponseEntitySchema = z.array(GlobalCategoryMaterialBusinessValueSchema);

const GlobalCategoryMaterialGetAllResponseSchema = z
  .object({
    data: GlobalCategoryMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = GlobalCategoryMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
