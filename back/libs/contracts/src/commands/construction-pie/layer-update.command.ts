import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { PieLayerBusinessValueSchema, PieLayerSchema } from '../../models/construction-pie/pie-layer.schema';

const PieLayerUpdateRequestSchema = PieLayerSchema.pick({
  orderIndex: true,
  materialUuid: true,
  name: true,
  thickness: true,
  density: true,
  consumptionPerM2: true,
  unitMeasurement: true,
  unitCost: true,
  comment: true,
}).partial();

const PieLayerUpdateResponseSchema = z
  .object({
    data: PieLayerBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace PieLayerUpdateCommand {
  export const RequestSchema = PieLayerUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = PieLayerUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = PieLayerBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
