import { z } from 'zod';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialGetAllResponseSchema = z
  .object({
    data: z.array(
      MaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace MaterialGetAllCommand {
  export const ResponseSchema = MaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
