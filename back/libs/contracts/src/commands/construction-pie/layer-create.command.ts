import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { PieLayerBusinessValueSchema, PieLayerSchema } from '../../models/construction-pie/pie-layer.schema';

const PieLayerCreateRequestSchema = PieLayerSchema.pick({
  orderIndex: true,
  materialUuid: true,
  name: true,
  thickness: true,
  density: true,
  consumptionPerM2: true,
  unitMeasurement: true,
  unitCost: true,
  comment: true,
}).partial({ materialUuid: true, density: true, comment: true });

const PieLayerCreateResponseSchema = z
  .object({
    data: PieLayerBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace PieLayerCreateCommand {
  export const RequestSchema = PieLayerCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PieLayerCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PieLayerBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
