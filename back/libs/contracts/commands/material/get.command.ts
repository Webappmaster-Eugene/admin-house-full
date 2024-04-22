import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetResponseSchema = z
  .object({
    data: MaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace MaterialGetCommand {
  export const ResponseSchema = MaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
