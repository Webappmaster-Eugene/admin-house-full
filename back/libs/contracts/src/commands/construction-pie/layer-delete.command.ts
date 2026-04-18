import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { PieLayerBusinessValueSchema } from '../../models/construction-pie/pie-layer.schema';

const PieLayerDeleteResponseSchema = z
  .object({
    data: PieLayerBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace PieLayerDeleteCommand {
  export const ResponseSchema = PieLayerDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PieLayerBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
