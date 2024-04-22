import { z } from 'zod';
import { FieldCategorySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldCategoryGetResponseSchema = z
  .object({
    data: FieldCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldCategoryGetCommand {
  export const ResponseSchema = FieldCategoryGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
