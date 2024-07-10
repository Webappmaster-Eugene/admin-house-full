import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import {
  ResponsiblePartnerProducerBusinessValueSchema,
  ResponsiblePartnerProducerRelatedEntitiesSchema,
  ResponsiblePartnerProducerSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerDeleteResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema.strict(),
);

const ResponsiblePartnerProducerDeleteResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ResponsiblePartnerProducerDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
