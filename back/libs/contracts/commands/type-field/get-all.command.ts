import { z } from 'zod';
import { TypeFieldSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TypeFieldGetAllResponseSchema = z
  .object({
    data: z.array(
      TypeFieldSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace TypeFieldGetAllCommand {
  export const ResponseSchema = TypeFieldGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
