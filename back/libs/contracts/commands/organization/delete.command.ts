import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { OrganizationSchema } from '../../models';

const OrganizationDeleteResponseSchema = OrganizationSchema.pick({
  uuid: true,
});

export namespace OrganizationDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = OrganizationDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
