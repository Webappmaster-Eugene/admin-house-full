import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialDeleteResponseEntitySchema = GlobalCategoryMaterialSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  color: true,
  uuid: true,
  lastChangeByUserUuid: true,
});

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
