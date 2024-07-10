import { z } from 'zod';
import { AppInfoBusinessValueSchema, ResponseClientSchema } from '../../models';

const AppInfoGetResponseEntitySchema = AppInfoBusinessValueSchema;

const AppInfoGetResponseSchema = z
  .object({
    data: AppInfoGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace AppInfoGetCommand {
  export const ResponseSchema = AppInfoGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AppInfoGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
