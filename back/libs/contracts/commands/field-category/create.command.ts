import { z } from 'zod';
import { FieldCategorySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const FieldCategoryCreateRequestSchema = FieldCategorySchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const FieldCategoryCreateResponseSchema = z
  .object({
    data: FieldCategorySchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace FieldCategoryCreateCommand {
  export const RequestSchema = FieldCategoryCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FieldCategoryCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
