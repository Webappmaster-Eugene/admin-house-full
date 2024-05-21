import { z } from 'zod';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialGetResponseSchema = z
  .object({
    data: CharacteristicsMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialGetCommand {
  export const ResponseSchema = CharacteristicsMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
