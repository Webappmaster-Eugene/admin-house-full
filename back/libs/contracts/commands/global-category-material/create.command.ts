import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialCreateRequestSchema = GlobalCategoryMaterialSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  color: true,
});

const GlobalCategoryMaterialCreateResponseSchema = z
  .object({
    data: GlobalCategoryMaterialSchema.pick({
      name: true,
      nameRu: true,
      comment: true,
      color: true,
      uuid: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialCreateCommand {
  export const RequestSchema = GlobalCategoryMaterialCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = GlobalCategoryMaterialCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
