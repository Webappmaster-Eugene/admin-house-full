import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategorySchema } from '../../models/global-category';

const GlobalCategoryUpdateRequestSchema = GlobalCategorySchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  workspaceHandbookUuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
}).partial();

const GlobalCategoryUpdateResponseSchema = z
  .object({
    data: GlobalCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryUpdateCommand {
  export const RequestSchema = GlobalCategoryUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
