import { z } from 'zod';
import { RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { StatusResourceBusinessValueSchema } from '../../models/status-resource/status-resource-business-value.schema';

const StatusResourceGetAllResponseEntitySchema = z.array(StatusResourceBusinessValueSchema);

const StatusResourceGetAllResponseSchema = z
  .object({
    data: StatusResourceGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = StatusResourceGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
