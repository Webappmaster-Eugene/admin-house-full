import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { UnitTemplateBusinessValueSchema } from '../../models/unit-template/unit-template.schema';
import { UnitTemplateComponentBusinessValueSchema } from '../../models/unit-template/unit-template-component.schema';

const UnitTemplateGetResponseEntitySchema = UnitTemplateBusinessValueSchema.extend({
  components: z.array(UnitTemplateComponentBusinessValueSchema),
});

const UnitTemplateGetResponseSchema = z
  .object({
    data: UnitTemplateGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateGetCommand {
  export const ResponseSchema = UnitTemplateGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
