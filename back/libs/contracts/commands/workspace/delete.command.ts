import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceDeleteResponseEntitySchema = WorkspaceSchema.omit({
  createdAt: true,
  updatedAt: true,
});

const WorkspaceDeleteResponseSchema = z
  .object({
    data: WorkspaceDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = WorkspaceDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
