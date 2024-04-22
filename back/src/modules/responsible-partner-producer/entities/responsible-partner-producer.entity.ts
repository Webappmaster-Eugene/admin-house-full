import { ResponsiblePartnerProducer } from '@prisma/client';

export class ResponsiblePartnerProducerEntity implements ResponsiblePartnerProducer {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(responsible-partner-producer: Partial<ResponsiblePartnerProducer>) {
    Object.assign(this, responsible-partner-producer);
    return this;
  }
}
