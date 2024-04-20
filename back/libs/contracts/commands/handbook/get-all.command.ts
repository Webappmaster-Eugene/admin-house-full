import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

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
  export const ResponseSchema = HandbookGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
