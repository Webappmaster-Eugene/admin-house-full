import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeGetResponseEntitySchema = FieldTypeSchema.pick({
  name: true,
  description: true,
  jsType: true,
  lastChangeByUserUuid: true,
  uuid: true,
});

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
