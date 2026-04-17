import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import {
  UnitTemplateComponentBusinessValueSchema,
  UnitTemplateComponentSchema,
} from '../../models/unit-template/unit-template-component.schema';

const UnitTemplateComponentCreateRequestSchema = UnitTemplateComponentSchema.pick({
  orderIndex: true,
  itemType: true,
  materialUuid: true,
  name: true,
  unitMeasurement: true,
  quantityPerUnit: true,
  unitCost: true,
  comment: true,
}).partial({ materialUuid: true, comment: true });

const UnitTemplateComponentCreateResponseSchema = z
  .object({
    data: UnitTemplateComponentBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateComponentCreateCommand {
  export const RequestSchema = UnitTemplateComponentCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UnitTemplateComponentCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateComponentBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
