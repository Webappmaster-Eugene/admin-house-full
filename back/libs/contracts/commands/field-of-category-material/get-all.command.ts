import { z } from 'zod';
import { FieldOfCategoryMaterialSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldOfCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldOfCategoryMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
