import { z } from 'zod';
import { GlobalCategoryMaterialBusinessValueSchema, ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialCreateResponseEntitySchema = GlobalCategoryMaterialBusinessValueSchema;

const GlobalCategoryMaterialCreateRequestSchema = GlobalCategoryMaterialSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  color: true,
});

const GlobalCategoryMaterialCreateResponseSchema = z
  .object({
    data: GlobalCategoryMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace GlobalCategoryMaterialCreateCommand {
  export const RequestSchema = GlobalCategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
