import { z } from 'zod';
import { RequestGetAllQuerySchema, StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceGetAllResponseSchema = z
  .object({
    data: z.array(
      StatusResourceSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = StatusResourceGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
