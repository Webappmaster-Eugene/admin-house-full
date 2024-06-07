import { z } from 'zod';
import { FieldOfCategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetResponseSchema = z
  .object({
    data: FieldOfCategoryMaterialSchema.pick({
      name: true,
      comment: true,
      uniqueNameForTemplate: true,
      defaultValue: true,
      isRequired: true,
      unitOfMeasurementUuid: true,
      fieldTypeUuid: true,
      categoryMaterialUuid: true,
      lastChangeByUserUuid: true,
      handbookUuid: true,
      uuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetCommand {
  export const ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
