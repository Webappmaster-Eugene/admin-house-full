import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { TechLogChangesBusinessValueSchema } from '../../models/tech-log-changes/tech-log-changes-business-value.schema';

const TechLogChangesGetResponseEntitySchema = TechLogChangesBusinessValueSchema;

const TechLogChangesGetResponseSchema = z
  .object({
    data: TechLogChangesGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace TechLogChangesGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = TechLogChangesGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = TechLogChangesGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
