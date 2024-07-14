import { ResponsiblePartnerProducerSchema } from './responsible-partner-producer.schema';

export const ResponsiblePartnerProducerBusinessValueSchema = ResponsiblePartnerProducerSchema.pick({
  uuid: true,
  name: true,
  comment: true,
  info: true,
  email: true,
  phone: true,
  handbookUuid: true,
});
