import { z } from 'zod';
import { CategoryMaterialSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetAllResponseEntitySchema = z.array(
  CategoryMaterialSchema.pick({
    name: true,
    templateName: true,
    comment: true,
    uuid: true,
    globalCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
  }),
);

const CategoryMaterialGetAllResponseSchema = z
  .object({
    data: CategoryMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CategoryMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = CategoryMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
