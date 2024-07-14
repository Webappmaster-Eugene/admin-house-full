import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { FieldTypeBusinessValueSchema } from '../../models/field-type/field-type-business-value.schema';

const FieldTypeGetResponseEntitySchema = FieldTypeBusinessValueSchema;

const FieldTypeGetResponseSchema = z
  .object({
    data: FieldTypeGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeGetCommand {
  export const ResponseSchema = FieldTypeGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
