import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategoryMaterialSchema } from '../../models/global-category-material';

const GlobalCategoryMaterialDeleteResponseSchema = z
  .object({
    data: GlobalCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = GlobalCategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
