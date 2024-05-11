import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AppInfoSchema } from '../../models';

const AppInfoGetResponseSchema = z
  .object({
    data: AppInfoSchema.omit({
      uuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace AppInfoGetCommand {
  export const ResponseSchema = AppInfoGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
