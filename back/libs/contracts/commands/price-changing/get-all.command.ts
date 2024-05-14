import { z } from 'zod';
import { PriceChangingSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const PriceChangingGetAllResponseSchema = z
  .object({
    data: z.array(
      PriceChangingSchema.omit({
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace PriceChangingGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = PriceChangingGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
