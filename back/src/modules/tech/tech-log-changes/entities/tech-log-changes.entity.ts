import { TechLogChanges } from '.prisma/client';
import { EntityActions } from 'libs/contracts';

export class TechLogChangesEntity implements TechLogChanges {
  uuid: string;
  comment: string;
  oldInfo: string;
  newInfo: string;
  updateInfo: string;
  entity: string;
  name: string;
  action: EntityActions;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(techLogChanges: Partial<TechLogChanges>) {
    Object.assign(this, techLogChanges);
    return this;
  }
}
