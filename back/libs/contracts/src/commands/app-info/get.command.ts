import { z } from 'zod';
import { AppInfoBusinessValueSchema } from '../../models/app-info/app-info-business-value.schema';
import { ResponseClientSchema } from '../../models';

const AppInfoGetResponseEntitySchema = AppInfoBusinessValueSchema;

const AppInfoGetResponseSchema = z
  .object({
    data: AppInfoGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AppInfoGetCommand {
  export const BusinessValueSchema = AppInfoBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = AppInfoGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AppInfoGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
