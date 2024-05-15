import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const CategoryMaterialDeleteResponseSchema = z
  .object({
    data: CategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = CategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
