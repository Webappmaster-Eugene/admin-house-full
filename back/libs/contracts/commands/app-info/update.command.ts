import { z } from 'zod';
import { AppInfoBusinessValueSchema, ResponseClientSchema } from '../../models';
import { AppInfoSchema } from '../../models';

const AppInfoUpdateResponseEntitySchema = AppInfoBusinessValueSchema;

const AppInfoUpdateRequestSchema = AppInfoSchema.omit({
  uuid: true,
})
  .partial()
  .strict();

const AppInfoUpdateResponseSchema = z
  .object({
    data: AppInfoUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace AppInfoUpdateCommand {
  export const RequestSchema = AppInfoUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AppInfoUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AppInfoUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
