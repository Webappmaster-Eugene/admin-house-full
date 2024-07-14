import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { MaterialBusinessValueSchema } from '../../models/material/material-business-value.schema';
import { MaterialRelatedEntitiesSchema } from '../../models/material/material-related-entities.schema';
import { ResponseClientSchema } from '../../models';

const MaterialDeleteResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema);

const MaterialDeleteResponseSchema = z
  .object({
    data: MaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = MaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
