import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { HandbookBusinessValueSchema } from '../../models/handbook/handbook-business-value.schema';
import { HandbookRelatedEntitiesSchema } from '../../models/handbook/handbook-related-entities.schema';

const HandbookDeleteResponseEntitySchema = HandbookBusinessValueSchema.merge(HandbookRelatedEntitiesSchema);

const HandbookDeleteResponseSchema = z
  .object({
    data: HandbookDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace HandbookDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = HandbookDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = HandbookDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
