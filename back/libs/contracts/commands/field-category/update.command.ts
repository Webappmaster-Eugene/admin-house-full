import { z } from 'zod';
import { FieldCategorySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldCategoryUpdateRequestSchema = FieldCategorySchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
}).partial();

const FieldCategoryUpdateResponseSchema = z
  .object({
    data: FieldCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldCategoryUpdateCommand {
  export const RequestSchema = FieldCategoryUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldCategoryUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
