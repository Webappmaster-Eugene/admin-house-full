import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialUpdateRequestSchema = CategoryMaterialSchema.pick({
  name: true,
  comment: true,
  templateName: true,
}).partial();

const CategoryMaterialUpdateResponseSchema = z
  .object({
    data: CategoryMaterialSchema.omit({
      name: true,
      templateName: true,
      comment: true,
      uuid: true,
      globalCategoryMaterialUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialUpdateCommand {
  export const RequestSchema = CategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
