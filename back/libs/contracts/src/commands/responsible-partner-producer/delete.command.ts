import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';
import { ResponsiblePartnerProducerRelatedEntitiesSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema';
import { ResponsiblePartnerProducerBusinessValueSchema } from '../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema';

const ResponsiblePartnerProducerDeleteResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema,
);

const ResponsiblePartnerProducerDeleteResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ResponsiblePartnerProducerDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
