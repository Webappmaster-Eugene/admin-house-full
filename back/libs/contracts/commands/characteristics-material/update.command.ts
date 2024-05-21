import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialUpdateRequestSchema = CharacteristicsMaterialSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  handbookUuid: true,
  addedByUserUuid: true,
}).partial();

const CharacteristicsMaterialUpdateResponseSchema = z
  .object({
    data: CharacteristicsMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialUpdateCommand {
  export const RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
