import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { UnitTemplateComponentBusinessValueSchema } from '../../models/unit-template/unit-template-component.schema';

const UnitTemplateComponentDeleteResponseSchema = z
  .object({
    data: UnitTemplateComponentBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateComponentDeleteCommand {
  export const ResponseSchema = UnitTemplateComponentDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateComponentBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
