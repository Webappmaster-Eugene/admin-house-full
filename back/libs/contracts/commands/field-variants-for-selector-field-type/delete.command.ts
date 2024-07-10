import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import {
  FieldVariantsForSelectorFieldTypeBusinessValueSchema,
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
  ResponseClientSchema,
} from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema = FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema.strict(),
);

const FieldVariantsForSelectorFieldTypeDeleteResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldVariantsForSelectorFieldTypeDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
