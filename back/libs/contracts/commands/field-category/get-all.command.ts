import { z } from 'zod';
import { FieldCategorySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldCategoryGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldCategorySchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldCategoryGetAllCommand {
  export const ResponseSchema = FieldCategoryGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
