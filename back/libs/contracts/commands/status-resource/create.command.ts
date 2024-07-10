import { z } from 'zod';
import { StatusResourceBusinessValueSchema, StatusResourceSchema, TechLogChangesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceCreateResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceCreateRequestSchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
});

const StatusResourceCreateResponseSchema = z
  .object({
    data: StatusResourceCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace StatusResourceCreateCommand {
  export const RequestSchema = StatusResourceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = StatusResourceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
