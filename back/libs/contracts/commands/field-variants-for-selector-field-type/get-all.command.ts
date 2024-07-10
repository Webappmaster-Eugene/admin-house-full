import { z } from 'zod';
import {
  FieldVariantsForSelectorFieldTypeBusinessValueSchema,
  FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema,
  RequestGetAllQuerySchema,
  ResponseClientSchema,
} from '../../models';

const FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema = z.array(
  FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema.strict()),
);

const FieldVariantsForSelectorFieldTypeGetAllResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldVariantsForSelectorFieldTypeGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
