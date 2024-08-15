import { z } from 'zod';
import { FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema';
import { FieldVariantsForSelectorFieldTypeSchema, ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeBusinessValueSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema';

const FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
);

const FieldVariantsForSelectorFieldTypeCreateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
  fieldVariantsForSelectorFieldTypeStatus: true,
});

const FieldVariantsForSelectorFieldTypeCreateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeCreateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
