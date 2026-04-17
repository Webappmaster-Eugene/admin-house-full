import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { UnitTemplateBusinessValueSchema } from '../../models/unit-template/unit-template.schema';

const UnitTemplateDeleteResponseSchema = z
  .object({
    data: UnitTemplateBusinessValueSchema,
  })
  .merge(ResponseClientSchema);

export namespace UnitTemplateDeleteCommand {
  export const ResponseSchema = UnitTemplateDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UnitTemplateBusinessValueSchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
