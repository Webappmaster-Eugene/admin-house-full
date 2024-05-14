import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialUpdateRequestSchema = GlobalCategoryMaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  workspaceHandbookUuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
}).partial();

const GlobalCategoryMaterialUpdateResponseSchema = z
  .object({
    data: GlobalCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialUpdateCommand {
  export const RequestSchema = GlobalCategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
