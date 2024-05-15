import { StatusResource } from '@prisma/client';

export class StatusResourceEntity implements StatusResource {
  uuid: string;
  name: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(statusResource: Partial<StatusResource>) {
    Object.assign(this, statusResource);
    return this;
  }
}
