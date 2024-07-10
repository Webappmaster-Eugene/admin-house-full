import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { MaterialBusinessValueSchema, MaterialRelatedEntitiesSchema, MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialDeleteResponseEntitySchema = MaterialBusinessValueSchema.merge(MaterialRelatedEntitiesSchema.strict());

const MaterialDeleteResponseSchema = z
  .object({
    data: MaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace MaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = MaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
