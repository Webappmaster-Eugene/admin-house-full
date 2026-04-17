import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { UnitTemplateBusinessValueSchema, UnitTemplateSchema } from '../../models/unit-template/unit-template.schema';

const UnitTemplateCreateRequestSchema = UnitTemplateSchema.pick({
  name: true,
  description: true,
  unitMeasurement: true,
  defaultMarkupPercent: true,
}).partial({ description: true, defaultMarkupPercent: true });

const UnitTemplateCreateResponseSchema = z
  .object({
    data: UnitTemplateBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateCreateCommand {
  export const RequestSchema = UnitTemplateCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UnitTemplateCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
