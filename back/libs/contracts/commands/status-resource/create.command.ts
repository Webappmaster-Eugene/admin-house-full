import { z } from 'zod';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceCreateRequestSchema = StatusResourceSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const StatusResourceCreateResponseSchema = z
  .object({
    data: StatusResourceSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceCreateCommand {
  export const RequestSchema = StatusResourceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusResourceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
