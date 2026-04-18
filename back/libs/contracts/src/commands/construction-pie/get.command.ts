import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { ConstructionPieBusinessValueSchema } from '../../models/construction-pie/construction-pie.schema';
import { PieLayerBusinessValueSchema } from '../../models/construction-pie/pie-layer.schema';

const ConstructionPieGetResponseEntitySchema = ConstructionPieBusinessValueSchema.extend({
  layers: z.array(PieLayerBusinessValueSchema),
});

const ConstructionPieGetResponseSchema = z
  .object({
    data: ConstructionPieGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ConstructionPieGetCommand {
  export const ResponseSchema = ConstructionPieGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ConstructionPieGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
