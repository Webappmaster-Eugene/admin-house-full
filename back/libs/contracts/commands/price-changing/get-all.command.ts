import { z } from 'zod';
import { PriceChangingSchema } from '../../models';
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
  export const ResponseSchema = PriceChangingGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
