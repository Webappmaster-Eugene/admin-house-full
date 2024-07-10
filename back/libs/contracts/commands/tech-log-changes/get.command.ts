import { z } from 'zod';
import { TechLogChangesBusinessValueSchema, TechLogChangesSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const TechLogChangesGetResponseEntitySchema = TechLogChangesBusinessValueSchema;

const TechLogChangesGetResponseSchema = z
  .object({
    data: TechLogChangesGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace TechLogChangesGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = TechLogChangesGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = TechLogChangesGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
