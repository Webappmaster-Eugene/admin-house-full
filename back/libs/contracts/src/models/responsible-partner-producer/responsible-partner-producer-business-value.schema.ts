import { ResponsiblePartnerProducerSchema } from './responsible-partner-producer.schema';

export const ResponsiblePartnerProducerBusinessValueSchema = ResponsiblePartnerProducerSchema.pick({
  uuid: true,
  name: true,
  comment: true,
  lastChangeByUserUuid: true,
  responsiblePartnerProducerStatus: true,
  numInOrder: true,
  info: true,
  email: true,
  phone: true,
  handbookUuid: true,
});
