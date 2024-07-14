import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { GlobalCategoryMaterialBusinessValueSchema } from '../../models/global-category-material/global-category-business-value.schema';
import { ResponseClientSchema } from '../../models';

const GlobalCategoryMaterialDeleteResponseEntitySchema = GlobalCategoryMaterialBusinessValueSchema;

const GlobalCategoryMaterialDeleteResponseSchema = z
  .object({
    data: GlobalCategoryMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = GlobalCategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
