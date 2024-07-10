import { z } from 'zod';
import {
  FieldVariantsForSelectorFieldTypeBusinessValueSchema,
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
  ResponseClientSchema,
} from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeGetResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema.strict(),
);

const FieldVariantsForSelectorFieldTypeGetResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldVariantsForSelectorFieldTypeGetCommand {
  export const ResponseSchema = FieldVariantsForSelectorFieldTypeGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
