import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { GlobalCategoryMaterialBusinessValueSchema, ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialDeleteResponseEntitySchema = GlobalCategoryMaterialBusinessValueSchema;

const GlobalCategoryMaterialDeleteResponseSchema = z
  .object({
    data: GlobalCategoryMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace GlobalCategoryMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = GlobalCategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
