import { StatusApprove } from '.prisma/client';
import { EApproveStatuses } from '@prisma/client';
// import { AutoMap } from '@numart/automapper/classes';

export class StatusApproveEntity implements StatusApprove {
  // @AutoMap()
  uuid: string;

  //@AutoMap()
  name: EApproveStatuses;

  //@AutoMap()
  nameRu: string;

  //@AutoMap()
  comment: string;

  //@AutoMap()
  lastChangeByUserUuid: string;

  //@AutoMap()
  createdAt: Date;

  // @AutoMap()
  updatedAt: Date;

  constructor(statusApprove: Partial<StatusApprove>) {
    Object.assign(this, statusApprove);
    return this;
  }
}
