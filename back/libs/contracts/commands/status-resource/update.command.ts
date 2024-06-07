import { z } from 'zod';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceUpdateRequestSchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
}).partial();

const StatusResourceUpdateResponseSchema = z
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

export namespace StatusResourceUpdateCommand {
  export const RequestSchema = StatusResourceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusResourceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
