import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { StatusApproveBusinessValueSchema } from '../../models/status-approve/status-approve-business-value.schema';

const StatusApproveDeleteResponseEntitySchema = StatusApproveBusinessValueSchema;

const StatusApproveDeleteResponseSchema = z
  .object({
    data: StatusApproveDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace StatusApproveDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = StatusApproveDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
