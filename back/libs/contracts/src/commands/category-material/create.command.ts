import { z } from 'zod';
import { CategoryMaterialSchema, ResponseClientSchema } from '../../models';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema';

const CategoryMaterialCreateResponseEntitySchema = CategoryMaterialSchema.pick({
  name: true,
  templateName: true,
  comment: true,
  uuid: true,
  globalCategoryMaterialUuid: true,
  lastChangeByUserUuid: true,
}).merge(CategoryMaterialBusinessValueSchema);

const CategoryMaterialCreateRequestSchema = CategoryMaterialSchema.pick({
  name: true,
  comment: true,
  templateName: true,
  globalCategoryMaterialUuid: true,
});

const CategoryMaterialCreateResponseSchema = z
  .object({
    data: CategoryMaterialCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialCreateCommand {
  export const RequestSchema = CategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
