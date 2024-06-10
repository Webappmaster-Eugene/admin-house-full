import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
  handbookUuid: true,
  uuid: true,
  fieldOfCategoryMaterialUuid: true,
  lastChangeByUserUuid: true,
});

const FieldVariantsForSelectorFieldTypeCreateRequestSchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
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
