import { z } from 'zod';
import { ResponseClientSchema, StatusResourceSchema } from '../../models';
import { StatusResourceBusinessValueSchema } from '../../models/status-resource/status-resource-business-value.schema';

const StatusResourceCreateResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceCreateRequestSchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
});

const StatusResourceCreateResponseSchema = z
  .object({
    data: StatusResourceCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceCreateCommand {
  export const RequestSchema = StatusResourceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusResourceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
