import { z } from 'zod';
import { CategoryMaterialSchema } from '../../models';
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
  export const ResponseSchema = CategoryMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
