import { z } from 'zod';
import { FieldTypeBusinessValueSchema, FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeUpdateResponseEntitySchema = FieldTypeBusinessValueSchema;

const FieldTypeUpdateRequestSchema = FieldTypeSchema.pick({
  description: true,
}).partial();

const FieldTypeUpdateResponseSchema = z
  .object({
    data: FieldTypeUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FieldTypeUpdateCommand {
  export const RequestSchema = FieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
