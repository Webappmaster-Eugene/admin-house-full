import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { ConstructionPieBusinessValueSchema } from '../../models/construction-pie/construction-pie.schema';
import { PieLayerBusinessValueSchema } from '../../models/construction-pie/pie-layer.schema';

const ConstructionPieGetAllResponseEntitySchema = z.array(
  ConstructionPieBusinessValueSchema.extend({
    layers: z.array(PieLayerBusinessValueSchema),
  }),
);

const ConstructionPieGetAllResponseSchema = z
  .object({
    data: ConstructionPieGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ConstructionPieGetAllCommand {
  export const ResponseSchema = ConstructionPieGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ConstructionPieGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
