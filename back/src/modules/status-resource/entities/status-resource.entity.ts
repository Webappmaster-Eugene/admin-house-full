import { StatusResource } from '@prisma/client';

export class StatusResourceEntity implements StatusResource {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(statusResource: Partial<StatusResource>) {
    Object.assign(this, statusResource);
    return this;
  }
}
