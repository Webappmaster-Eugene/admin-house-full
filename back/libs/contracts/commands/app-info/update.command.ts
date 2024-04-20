import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { AppInfoSchema } from '../../models';

const AppInfoUpdateRequestSchema = AppInfoSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
}).partial();

const AppInfoUpdateResponseSchema = z
  .object({
    data: AppInfoSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace AppInfoUpdateCommand {
  export const RequestSchema = AppInfoUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AppInfoUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
