import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AppInfoSchema } from '../../models';

const AppInfoUpdateResponseEntitySchema = AppInfoSchema.pick({
  status: true,
  comment: true,
  language: true,
  currency: true,
  name: true,
  description: true,
  lastChangeByUserUuid: true,
});

const AppInfoUpdateRequestSchema = AppInfoSchema.omit({
  uuid: true,
})
  .partial()
  .strict();

const AppInfoUpdateResponseSchema = z
  .object({
    data: AppInfoUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AppInfoUpdateCommand {
  export const RequestSchema = AppInfoUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AppInfoUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AppInfoUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
