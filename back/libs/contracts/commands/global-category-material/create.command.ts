import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategoryMaterialSchema } from '../../models/global-category-material';

const GlobalCategoryMaterialCreateRequestSchema =
  GlobalCategoryMaterialSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
  });

const GlobalCategoryMaterialCreateResponseSchema = z
  .object({
    data: GlobalCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialCreateCommand {
  export const RequestSchema = GlobalCategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
