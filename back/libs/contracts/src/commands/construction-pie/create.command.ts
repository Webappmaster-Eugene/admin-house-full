import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { ConstructionPieBusinessValueSchema, ConstructionPieSchema } from '../../models/construction-pie/construction-pie.schema';

const ConstructionPieCreateRequestSchema = ConstructionPieSchema.pick({
  name: true,
  description: true,
  unitMeasurement: true,
  defaultMarkupPercent: true,
}).partial({ description: true, unitMeasurement: true, defaultMarkupPercent: true });

const ConstructionPieCreateResponseSchema = z
  .object({
    data: ConstructionPieBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace ConstructionPieCreateCommand {
  export const RequestSchema = ConstructionPieCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ConstructionPieCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ConstructionPieBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
