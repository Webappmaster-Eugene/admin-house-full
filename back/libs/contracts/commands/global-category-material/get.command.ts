import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { GlobalCategoryMaterialSchema } from '../../models';

const GlobalCategoryMaterialGetResponseEntitySchema = GlobalCategoryMaterialSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  color: true,
  uuid: true,
  lastChangeByUserUuid: true,
});

const GlobalCategoryMaterialGetResponseSchema = z
  .object({
    data: GlobalCategoryMaterialGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace GlobalCategoryMaterialGetCommand {
  export const ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = GlobalCategoryMaterialGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
