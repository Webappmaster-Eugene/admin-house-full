import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeUpdateRequestSchema = FieldTypeSchema.pick({
  description: true,
}).partial();

const FieldTypeUpdateResponseSchema = z
  .object({
    data: FieldTypeSchema.pick({
      name: true,
      description: true,
      jsType: true,
      lastChangeByUserUuid: true,
      uuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeUpdateCommand {
  export const RequestSchema = FieldTypeUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
