import { z } from 'zod';
import { StatusResourceBusinessValueSchema, StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceUpdateResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceUpdateRequestSchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
}).partial();

const StatusResourceUpdateResponseSchema = z
  .object({
    data: StatusResourceUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace StatusResourceUpdateCommand {
  export const RequestSchema = StatusResourceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusResourceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
