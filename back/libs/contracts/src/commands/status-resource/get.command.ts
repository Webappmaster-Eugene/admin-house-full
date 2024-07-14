import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { StatusResourceBusinessValueSchema } from '../../models/status-resource/status-resource-business-value.schema';

const StatusResourceGetResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceGetResponseSchema = z
  .object({
    data: StatusResourceGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceGetCommand {
  export const ResponseSchema = StatusResourceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
