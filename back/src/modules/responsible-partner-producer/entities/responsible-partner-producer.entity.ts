import { ResponsiblePartnerProducer } from '.prisma/client';

export class ResponsiblePartnerProducerEntity implements ResponsiblePartnerProducer {
  uuid: string;
  name: string;
  comment: string;
  handbookUuid: string;
  email: string;
  phone: string;
  info: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(responsiblePartnerProducer: Partial<ResponsiblePartnerProducer>) {
    Object.assign(this, responsiblePartnerProducer);
    return this;
  }
}
