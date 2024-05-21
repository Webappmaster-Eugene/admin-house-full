import { z } from 'zod';
import { EntityUrlParamCommand } from '../common';
import { CharacteristicsMaterialSchema, ResponseClientSchema } from '../../models';

const CharacteristicsMaterialDeleteResponseSchema = z
  .object({
    data: CharacteristicsMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CharacteristicsMaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = CharacteristicsMaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
