import { ResponsiblePartnerProducer } from '.prisma/client';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';

export interface ResponsiblePartnerProducerRelatedEntities {
  handbook: HandbookEntity;
  materials: MaterialEntity[];
}

export class ResponsiblePartnerProducerEntity implements ResponsiblePartnerProducer, ResponsiblePartnerProducerRelatedEntities {
  uuid: string;
  name: string;
  comment: string;
  handbookUuid: string;
  email: string;
  phone: string;
  info: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  handbook: HandbookEntity;
  materials: MaterialEntity[];

  constructor(responsiblePartnerProducer: Partial<ResponsiblePartnerProducer>) {
    Object.assign(this, responsiblePartnerProducer);
    return this;
  }
}
