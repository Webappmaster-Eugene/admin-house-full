import { z } from 'zod';
import { CategoryMaterialSchema, ResponseClientSchema } from '../../models';
import { AppInfoSchema } from '../../models';

const AppInfoGetResponseEntitySchema = AppInfoSchema.pick({
  name: true,
  description: true,
  currency: true,
  language: true,
  comment: true,
  status: true,
  lastChangeByUserUuid: true,
});

const AppInfoGetResponseSchema = z
  .object({
    data: AppInfoGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AppInfoGetCommand {
  export const ResponseSchema = AppInfoGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AppInfoGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
