import { z } from 'zod';
import { MaterialSchema, RequestGetAllQuerySchema } from '../../models';
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
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = MaterialGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
