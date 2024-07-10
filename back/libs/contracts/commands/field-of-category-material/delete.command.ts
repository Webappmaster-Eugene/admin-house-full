import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import {
  FieldOfCategoryMaterialBusinessValueSchema,
  FieldOfCategoryMaterialRelatedEntitiesSchema,
  FieldOfCategoryMaterialSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialDeleteResponseEntitySchema = FieldOfCategoryMaterialBusinessValueSchema.merge(
  FieldOfCategoryMaterialRelatedEntitiesSchema.strict(),
);

const FieldOfCategoryMaterialDeleteResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldOfCategoryMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
