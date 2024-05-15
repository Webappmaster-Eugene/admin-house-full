import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { CategoryMaterialSchema } from '../../models';

const CategoryMaterialCreateRequestSchema = CategoryMaterialSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const CategoryMaterialCreateResponseSchema = z
  .object({
    data: CategoryMaterialSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace CategoryMaterialCreateCommand {
  export const RequestSchema = CategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = CategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
