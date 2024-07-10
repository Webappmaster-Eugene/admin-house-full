import { z } from 'zod';
import {
  FieldOfCategoryMaterialBusinessValueSchema,
  FieldOfCategoryMaterialRelatedEntitiesSchema,
  FieldOfCategoryMaterialSchema,
  RequestGetAllQuerySchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetAllResponseEntitySchema = z.array(
  FieldOfCategoryMaterialBusinessValueSchema.merge(FieldOfCategoryMaterialRelatedEntitiesSchema.strict()),
);

const FieldOfCategoryMaterialGetAllResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldOfCategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldOfCategoryMaterialGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
