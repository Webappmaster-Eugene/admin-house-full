import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { ConstructionPieBusinessValueSchema, ConstructionPieSchema } from '../../models/construction-pie/construction-pie.schema';

const ConstructionPieUpdateRequestSchema = ConstructionPieSchema.pick({
  name: true,
  description: true,
  unitMeasurement: true,
  defaultMarkupPercent: true,
}).partial();

const ConstructionPieUpdateResponseSchema = z
  .object({
    data: ConstructionPieBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace ConstructionPieUpdateCommand {
  export const RequestSchema = ConstructionPieUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ConstructionPieUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ConstructionPieBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
