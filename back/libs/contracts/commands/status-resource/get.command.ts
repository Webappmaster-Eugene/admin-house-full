import { z } from 'zod';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceGetResponseEntitySchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

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
