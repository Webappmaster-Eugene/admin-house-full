import { z } from 'zod';
import { FieldOfCategoryMaterialSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfCategoryMaterialGetAllResponseSchema = z
  .object({
    data: z.array(
      FieldOfCategoryMaterialSchema.pick({
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
    ),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfCategoryMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FieldOfCategoryMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
