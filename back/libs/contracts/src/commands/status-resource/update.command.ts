import { z } from 'zod';
import { ResponseClientSchema, StatusResourceSchema } from '../../models';
import { StatusResourceBusinessValueSchema } from '../../models/status-resource/status-resource-business-value.schema';

const StatusResourceUpdateResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceUpdateRequestSchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
}).partial();

const StatusResourceUpdateResponseSchema = z
  .object({
    data: StatusResourceUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceUpdateCommand {
  export const RequestSchema = StatusResourceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusResourceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
