import { z } from 'zod';
import { GlobalCategoryMaterialSchema, ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialBusinessValueSchema } from '../../models/global-category-material/global-category-business-value.schema';

const GlobalCategoryMaterialUpdateResponseEntitySchema = GlobalCategoryMaterialBusinessValueSchema;

const GlobalCategoryMaterialUpdateRequestSchema = GlobalCategoryMaterialSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  color: true,
}).partial();

const GlobalCategoryMaterialUpdateResponseSchema = z
  .object({
    data: GlobalCategoryMaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialUpdateCommand {
  export const RequestSchema = GlobalCategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
