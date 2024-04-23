import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models/field-variants-for-selector-field-type';

const FieldVariantsForSelectorFieldTypeGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldVariantsForSelectorFieldTypeSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeGetAllCommand {
  export const ResponseSchema =
    FieldVariantsForSelectorFieldTypeGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
