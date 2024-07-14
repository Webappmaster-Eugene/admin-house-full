import { z } from 'zod';
import { EntityUrlParamCommand } from '../../commands/common';
import { ResponseClientSchema } from '../../models';
import { StatusResourceBusinessValueSchema } from '../../models/status-resource/status-resource-business-value.schema';

const StatusResourceDeleteResponseEntitySchema = StatusResourceBusinessValueSchema;

const StatusResourceDeleteResponseSchema = z
  .object({
    data: StatusResourceDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusResourceDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = StatusResourceDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusResourceDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
