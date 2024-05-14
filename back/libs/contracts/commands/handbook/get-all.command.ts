import { z } from 'zod';
import { HandbookSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookGetAllResponseSchema = z
  .object({
    data: z.array(
      HandbookSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace HandbookGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = HandbookGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
