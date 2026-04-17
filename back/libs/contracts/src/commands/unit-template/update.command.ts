import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { UnitTemplateBusinessValueSchema, UnitTemplateSchema } from '../../models/unit-template/unit-template.schema';

const UnitTemplateUpdateRequestSchema = UnitTemplateSchema.pick({
  name: true,
  description: true,
  unitMeasurement: true,
  defaultMarkupPercent: true,
}).partial();

const UnitTemplateUpdateResponseSchema = z
  .object({
    data: UnitTemplateBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateUpdateCommand {
  export const RequestSchema = UnitTemplateUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UnitTemplateUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
