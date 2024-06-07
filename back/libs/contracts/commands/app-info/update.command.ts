import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AppInfoSchema } from '../../models';

const AppInfoUpdateRequestSchema = AppInfoSchema.omit({
  uuid: true,
})
  .partial()
  .strict();

const AppInfoUpdateResponseSchema = z
  .object({
    data: AppInfoSchema.pick({
      status: true,
      comment: true,
      language: true,
      currency: true,
      name: true,
      description: true,
      lastChangeByUserUuid: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace AppInfoUpdateCommand {
  export const RequestSchema = AppInfoUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AppInfoUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
