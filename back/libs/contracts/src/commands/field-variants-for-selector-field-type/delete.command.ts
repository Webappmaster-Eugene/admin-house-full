import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import { FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema';
import { FieldVariantsForSelectorFieldTypeBusinessValueSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema';
import { ResponseClientSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
);

const FieldVariantsForSelectorFieldTypeDeleteResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
