import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import {
  UnitTemplateComponentBusinessValueSchema,
  UnitTemplateComponentSchema,
} from '../../models/unit-template/unit-template-component.schema';

const UnitTemplateComponentUpdateRequestSchema = UnitTemplateComponentSchema.pick({
  orderIndex: true,
  itemType: true,
  materialUuid: true,
  name: true,
  unitMeasurement: true,
  quantityPerUnit: true,
  unitCost: true,
  comment: true,
}).partial();

const UnitTemplateComponentUpdateResponseSchema = z
  .object({
    data: UnitTemplateComponentBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateComponentUpdateCommand {
  export const RequestSchema = UnitTemplateComponentUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UnitTemplateComponentUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateComponentBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
