import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, StatusApproveSchema } from '../../models';

const StatusApproveDeleteResponseEntitySchema = StatusApproveSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

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
