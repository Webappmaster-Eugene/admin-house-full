import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import {} from '../../models/field-variants-for-selector-field-type';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  fieldOfCategoryMaterialUuid: true,
  handbookUuid: true,
}).partial();

const FieldVariantsForSelectorFieldTypeUpdateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeUpdateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
