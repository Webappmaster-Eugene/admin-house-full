import { z } from 'zod';
import { RequestGetAllQuerySchema, StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceGetAllResponseEntitySchema = z.array(
  StatusResourceSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
  }),
);

const StatusResourceGetAllResponseSchema = z
  .object({
    data: StatusResourceGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = StatusResourceGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
