import { z } from 'zod';
import { TypeFieldSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const TypeFieldGetResponseSchema = z
  .object({
    data: TypeFieldSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace TypeFieldGetCommand {
  export const ResponseSchema = TypeFieldGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
