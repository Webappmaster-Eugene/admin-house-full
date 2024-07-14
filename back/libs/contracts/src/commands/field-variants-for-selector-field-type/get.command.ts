import { z } from 'zod';
import { FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeBusinessValueSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema';

const FieldVariantsForSelectorFieldTypeGetResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
);

const FieldVariantsForSelectorFieldTypeGetResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeGetCommand {
  export const ResponseSchema = FieldVariantsForSelectorFieldTypeGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
