import { z } from 'zod';
import { FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema';
import { FieldVariantsForSelectorFieldTypeSchema, ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeBusinessValueSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema';

const FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
);

const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
}).partial();

const FieldVariantsForSelectorFieldTypeUpdateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeUpdateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
