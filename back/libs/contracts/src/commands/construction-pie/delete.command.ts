import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { ConstructionPieBusinessValueSchema } from '../../models/construction-pie/construction-pie.schema';

const ConstructionPieDeleteResponseSchema = z
  .object({
    data: ConstructionPieBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace ConstructionPieDeleteCommand {
  export const ResponseSchema = ConstructionPieDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ConstructionPieBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
