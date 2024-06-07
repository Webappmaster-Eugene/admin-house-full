import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import {} from '../../models/field-variants-for-selector-field-type';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
}).partial();

const FieldVariantsForSelectorFieldTypeUpdateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeSchema.pick({
      description: true,
      value: true,
      handbookUuid: true,
      uuid: true,
      fieldOfCategoryMaterialUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeUpdateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
