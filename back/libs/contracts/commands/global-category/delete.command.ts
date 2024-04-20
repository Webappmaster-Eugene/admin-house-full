import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models/response-client';
import { GlobalCategorySchema } from '../../models/global-category';

const GlobalCategoryDeleteResponseSchema = z
  .object({
    data: GlobalCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = GlobalCategoryDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
