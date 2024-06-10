import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeUpdateResponseEntitySchema = FieldTypeSchema.pick({
  name: true,
  description: true,
  jsType: true,
  lastChangeByUserUuid: true,
  uuid: true,
});

const FieldTypeUpdateRequestSchema = FieldTypeSchema.pick({
  description: true,
}).partial();

const FieldTypeUpdateResponseSchema = z
  .object({
    data: FieldTypeUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeUpdateCommand {
  export const RequestSchema = FieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FieldTypeUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
