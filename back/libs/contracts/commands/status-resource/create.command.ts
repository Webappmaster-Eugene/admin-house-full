import { z } from 'zod';
import { StatusResourceSchema, TechLogChangesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceCreateResponseEntitySchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

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
