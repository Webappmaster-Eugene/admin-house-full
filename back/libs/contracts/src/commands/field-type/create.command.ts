import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { FieldTypeBusinessValueSchema } from '../../models/field-type/field-type-business-value.schema';

const FieldTypeCreateResponseEntitySchema = FieldTypeBusinessValueSchema;

const FieldTypeCreateRequestSchema = FieldTypeSchema.pick({
  name: true,
  description: true,
  jsType: true,
});

const FieldTypeCreateResponseSchema = z
  .object({
    data: FieldTypeCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeCreateCommand {
  export const RequestSchema = FieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
