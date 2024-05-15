import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldOfMaterialGetResponseSchema = z
  .object({
    data: FieldOfMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldOfMaterialGetCommand {
  export const ResponseSchema = FieldOfMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
