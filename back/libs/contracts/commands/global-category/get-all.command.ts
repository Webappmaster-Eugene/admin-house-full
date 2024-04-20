import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategorySchema } from '../../models/global-category';

const GlobalCategoryGetAllResponseSchema = z
  .object({
    data: z.array(
      GlobalCategorySchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryGetAllCommand {
  export const ResponseSchema = GlobalCategoryGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
