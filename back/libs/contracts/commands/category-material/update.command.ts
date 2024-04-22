import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialUpdateRequestSchema = CategoryMaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  globalCategoryUuid: true,
}).partial();

const CategoryMaterialUpdateResponseSchema = z
  .object({
    data: CategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialUpdateCommand {
  export const RequestSchema = CategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
