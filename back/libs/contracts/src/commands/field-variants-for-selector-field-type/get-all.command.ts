import { z } from 'zod';
import { FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema';
import { FieldVariantsForSelectorFieldTypeBusinessValueSchema } from '../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema = z.array(
  FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema),
);

const FieldVariantsForSelectorFieldTypeGetAllResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
