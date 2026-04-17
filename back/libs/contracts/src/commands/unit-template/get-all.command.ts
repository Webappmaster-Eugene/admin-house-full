import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { UnitTemplateBusinessValueSchema } from '../../models/unit-template/unit-template.schema';
import { UnitTemplateComponentBusinessValueSchema } from '../../models/unit-template/unit-template-component.schema';

const UnitTemplateGetAllResponseEntitySchema = z.array(
  UnitTemplateBusinessValueSchema.extend({
    components: z.array(UnitTemplateComponentBusinessValueSchema),
  }),
);

const UnitTemplateGetAllResponseSchema = z
  .object({
    data: UnitTemplateGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateGetAllCommand {
  export const ResponseSchema = UnitTemplateGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
