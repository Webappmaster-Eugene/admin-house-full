import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeGetResponseSchema = z
  .object({
    data: FieldVariantsForSelectorFieldTypeSchema.pick({
      description: true,
      value: true,
      handbookUuid: true,
      uuid: true,
      fieldOfCategoryMaterialUuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeGetCommand {
  export const ResponseSchema = FieldVariantsForSelectorFieldTypeGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
