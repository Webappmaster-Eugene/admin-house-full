import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeCreateRequestSchema = FieldTypeSchema.pick({
  name: true,
  description: true,
  jsType: true,
});

const FieldTypeCreateResponseSchema = z
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

export namespace FieldTypeCreateCommand {
  export const RequestSchema = FieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
