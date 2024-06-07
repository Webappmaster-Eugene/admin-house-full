import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { FieldVariantsForSelectorFieldTypeSchema } from '../../models';

const FieldVariantsForSelectorFieldTypeGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldVariantsForSelectorFieldTypeSchema.pick({
        description: true,
        value: true,
        handbookUuid: true,
        uuid: true,
        fieldOfCategoryMaterialUuid: true,
        lastChangeByUserUuid: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldVariantsForSelectorFieldTypeGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldVariantsForSelectorFieldTypeGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
