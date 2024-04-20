import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategorySchema } from '../../models/global-category';

const GlobalCategoryGetResponseSchema = z
  .object({
    data: GlobalCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryGetCommand {
  export const ResponseSchema = GlobalCategoryGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
