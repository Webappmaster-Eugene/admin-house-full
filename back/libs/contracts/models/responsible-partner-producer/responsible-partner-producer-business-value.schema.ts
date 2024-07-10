import { ResponsiblePartnerProducerSchema } from './responsible-partner-producer.schema';

export const ResponsiblePartnerProducerBusinessValueSchema = ResponsiblePartnerProducerSchema.pick({
  name: true,
  comment: true,
  info: true,
  email: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
  uuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
});
