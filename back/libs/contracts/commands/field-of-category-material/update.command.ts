import { z } from 'zod';
import {
  FieldOfCategoryMaterialBusinessValueSchema,
  FieldOfCategoryMaterialRelatedEntitiesSchema,
  FieldOfCategoryMaterialSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialUpdateResponseEntitySchema = FieldOfCategoryMaterialBusinessValueSchema.merge(
  FieldOfCategoryMaterialRelatedEntitiesSchema.strict(),
);

const FieldOfCategoryMaterialUpdateRequestSchema = FieldOfCategoryMaterialSchema.pick({
  name: true,
  comment: true,
  uniqueNameForTemplate: true,
  defaultValue: true,
  unitOfMeasurementUuid: true,
  // DOC пока не дадим пользователю изменять этип поля
  //isRequired: true,
  // fieldTypeUuid: true,
}).partial();

const FieldOfCategoryMaterialUpdateResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldOfCategoryMaterialUpdateCommand {
  export const RequestSchema = FieldOfCategoryMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldOfCategoryMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldOfCategoryMaterialUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
