import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AppInfoSchema } from '../../models';

const AppInfoGetResponseSchema = z
  .object({
    data: AppInfoSchema.pick({
      name: true,
      description: true,
      currency: true,
      language: true,
      comment: true,
      status: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace AppInfoGetCommand {
  export const ResponseSchema = AppInfoGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
