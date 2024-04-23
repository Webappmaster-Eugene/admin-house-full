import { z } from 'zod';
import { FieldTypeSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldTypeCreateRequestSchema = FieldTypeSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const FieldTypeCreateResponseSchema = z
  .object({
    data: FieldTypeSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldTypeCreateCommand {
  export const RequestSchema = FieldTypeCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldTypeCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
