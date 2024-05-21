import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialCreateRequestSchema = CharacteristicsMaterialSchema.omit({
  uuid: true,
  addedByUserUuid: true,
  categoryMaterialUuid: true,
  materialUuid: true,
  handbookUuid: true,
  createdAt: true,
  updatedAt: true,
});

const CharacteristicsMaterialCreateResponseSchema = z
  .object({
    data: CharacteristicsMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialCreateCommand {
  export const RequestSchema = CharacteristicsMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
