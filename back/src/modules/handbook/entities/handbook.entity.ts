import { Handbook } from '.prisma/client';

export class HandbookEntity implements Handbook {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(handbook: Partial<Handbook>) {
    Object.assign(this, handbook);
    return this;
  }
}
