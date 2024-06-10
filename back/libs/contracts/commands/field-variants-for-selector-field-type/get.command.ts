import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeGetResponseEntitySchema = FieldVariantsForSelectorFieldTypeSchema.pick({
  description: true,
  value: true,
  handbookUuid: true,
  uuid: true,
  fieldOfCategoryMaterialUuid: true,
  lastChangeByUserUuid: true,
});

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
