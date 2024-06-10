import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { StatusResourceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const StatusResourceDeleteResponseEntitySchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

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
