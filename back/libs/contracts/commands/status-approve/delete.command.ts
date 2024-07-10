import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, StatusApproveBusinessValueSchema, StatusApproveSchema } from '../../models';

const StatusApproveDeleteResponseEntitySchema = StatusApproveBusinessValueSchema;

const StatusApproveDeleteResponseSchema = z
  .object({
    data: StatusApproveDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace StatusApproveDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = StatusApproveDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = StatusApproveDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
