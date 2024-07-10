import { z } from 'zod';
import { GlobalCategoryMaterialBusinessValueSchema, ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

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
  .merge(ResponseClientSchema.strict());

export namespace GlobalCategoryMaterialUpdateCommand {
  export const RequestSchema = GlobalCategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
