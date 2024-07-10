import { z } from 'zod';
import { FieldTypeBusinessValueSchema, FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeGetResponseEntitySchema = FieldTypeBusinessValueSchema;

const FieldTypeGetResponseSchema = z
  .object({
    data: FieldTypeGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldTypeGetCommand {
  export const ResponseSchema = FieldTypeGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
