import { z } from 'zod';
import { CategoryMaterialSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialGetAllResponseSchema = z
  .object({
    data: z.array(
      CategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CategoryMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
