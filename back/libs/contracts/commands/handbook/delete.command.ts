import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { HandbookBusinessValueSchema, HandbookRelatedEntitiesSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const HandbookDeleteResponseEntitySchema = HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema.strict());

const HandbookDeleteResponseSchema = z
  .object({
    data: HandbookDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace HandbookDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = HandbookDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
