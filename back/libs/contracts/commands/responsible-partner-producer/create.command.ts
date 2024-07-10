import { z } from 'zod';
import {
  ResponsiblePartnerProducerBusinessValueSchema,
  ResponsiblePartnerProducerRelatedEntitiesSchema,
  ResponsiblePartnerProducerSchema,
} from '../../models';
import { ResponseClientSchema } from '../../models';

const ResponsiblePartnerProducerCreateResponseEntitySchema = ResponsiblePartnerProducerBusinessValueSchema.merge(
  ResponsiblePartnerProducerRelatedEntitiesSchema.strict(),
);

const ResponsiblePartnerProducerCreateRequestSchema = ResponsiblePartnerProducerSchema.pick({
  name: true,
  comment: true,
  info: true,
  email: true,
  phone: true,
});

const ResponsiblePartnerProducerCreateResponseSchema = z
  .object({
    data: ResponsiblePartnerProducerCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace ResponsiblePartnerProducerCreateCommand {
  export const RequestSchema = ResponsiblePartnerProducerCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ResponsiblePartnerProducerCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ResponsiblePartnerProducerCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
