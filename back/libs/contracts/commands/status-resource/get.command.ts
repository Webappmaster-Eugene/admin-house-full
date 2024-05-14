import { z } from 'zod';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceGetResponseSchema = z
  .object({
    data: StatusResourceSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceGetCommand {
  export const ResponseSchema = StatusResourceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
