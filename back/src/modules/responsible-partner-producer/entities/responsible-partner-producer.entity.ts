import { EActiveStatuses, Handbook, Material, ResponsiblePartnerProducer } from '.prisma/client';

export interface ResponsiblePartnerProducerRelatedEntities {
  handbook: Handbook;
  materials: Material[];
}

export class ResponsiblePartnerProducerEntity implements ResponsiblePartnerProducer, ResponsiblePartnerProducerRelatedEntities {
  uuid: string;
  name: string;
  comment: string;
  numInOrder: number;
  responsiblePartnerProducerStatus: EActiveStatuses;
  handbookUuid: string;
  email: string;
  phone: string;
  info: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  handbook: Handbook;
  materials: Material[];

  constructor(responsiblePartnerProducer: Partial<ResponsiblePartnerProducer>) {
    Object.assign(this, responsiblePartnerProducer);
    return this;
  }
}
