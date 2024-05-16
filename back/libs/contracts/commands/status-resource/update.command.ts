import { z } from 'zod';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceUpdateRequestSchema = StatusResourceSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
}).partial();

const StatusResourceUpdateResponseSchema = z
  .object({
    data: StatusResourceSchema.omit({
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
