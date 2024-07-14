import { z } from 'zod';
import { AppInfoBusinessValueSchema } from '../../models/app-info/app-info-business-value.schema';
import { AppInfoSchema, ResponseClientSchema } from '../../models';

const AppInfoUpdateResponseEntitySchema = AppInfoBusinessValueSchema;

const AppInfoUpdateRequestSchema = AppInfoSchema.omit({
  uuid: true,
}).partial();

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
