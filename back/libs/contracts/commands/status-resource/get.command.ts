import { z } from 'zod';
import { StatusResourceBusinessValueSchema, StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceGetResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceGetResponseSchema = z
  .object({
    data: StatusResourceGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace StatusResourceGetCommand {
  export const ResponseSchema = StatusResourceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
