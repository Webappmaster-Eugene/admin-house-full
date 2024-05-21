import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import { FieldOfCategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialDeleteResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
