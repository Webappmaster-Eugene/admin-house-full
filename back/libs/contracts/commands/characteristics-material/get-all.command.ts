import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema, RequestGetAllQuerySchema } from '../../models';

const CharacteristicsMaterialGetAllResponseSchema = z
  .object({
    data: z.array(
      CharacteristicsMaterialSchema.pick({
        uuid: true,
        value: true,
        name: true,
        comment: true,
        fieldOfCategoryMaterialUuid: true,
        fieldUnitMeasurementUuid: true,
        fieldTypeUuid: true,
        handbookUuid: true,
        categoryMaterialUuid: true,
        materialUuid: true,
        lastChangeByUserUuid: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = CharacteristicsMaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
