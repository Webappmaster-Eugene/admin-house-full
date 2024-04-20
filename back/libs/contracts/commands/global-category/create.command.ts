import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategorySchema } from '../../models/global-category';

const GlobalCategoryCreateRequestSchema = GlobalCategorySchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const GlobalCategoryCreateResponseSchema = z
  .object({
    data: GlobalCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryCreateCommand {
  export const RequestSchema = GlobalCategoryCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
