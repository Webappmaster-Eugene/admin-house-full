import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeGetResponseSchema = z
  .object({
    data: FieldTypeSchema.pick({
      name: true,
      description: true,
      jsType: true,
      lastChangeByUserUuid: true,
      uuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeGetCommand {
  export const ResponseSchema = FieldTypeGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
