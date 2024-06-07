import { z } from 'zod';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceGetResponseSchema = z
  .object({
    data: StatusResourceSchema.pick({
      name: true,
      comment: true,
      uuid: true,
      lastChangeByUserUuid: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceGetCommand {
  export const ResponseSchema = StatusResourceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
