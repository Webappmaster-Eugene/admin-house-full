import { z } from 'zod';
import {
  FieldVariantsForSelectorFieldTypeBusinessValueSchema,
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
  ResponseClientSchema,
} from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema.strict(),
);

const FieldVariantsForSelectorFieldTypeCreateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
});

const FieldVariantsForSelectorFieldTypeCreateResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldVariantsForSelectorFieldTypeCreateCommand {
  export const RequestSchema = FieldVariantsForSelectorFieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
