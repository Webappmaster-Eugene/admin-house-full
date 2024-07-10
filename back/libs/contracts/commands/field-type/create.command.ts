import { z } from 'zod';
import { FieldTypeBusinessValueSchema, FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

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
  .merge(ResponseClientSchema.strict());

export namespace FieldTypeCreateCommand {
  export const RequestSchema = FieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
