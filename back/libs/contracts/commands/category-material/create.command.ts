import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { CategoryMaterialSchema } from '../../models';

const CategoryMaterialCreateRequestSchema = CategoryMaterialSchema.pick({
  name: true,
  comment: true,
  templateName: true,
  globalCategoryMaterialUuid: true,
});

const CategoryMaterialCreateResponseSchema = z
  .object({
    data: CategoryMaterialSchema.pick({
      name: true,
      templateName: true,
      comment: true,
      uuid: true,
      globalCategoryMaterialUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialCreateCommand {
  export const RequestSchema = CategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
