import { z } from 'zod';
import {
  FieldVariantsForSelectorFieldTypeBusinessValueSchema,
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
  ResponseClientSchema,
} from '../../models';
import {} from '../../models/field-variants-for-selector-field-type';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema.strict(),
);

const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
}).partial();

const FieldVariantsForSelectorFieldTypeUpdateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldVariantsForSelectorFieldTypeUpdateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
