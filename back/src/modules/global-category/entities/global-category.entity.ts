import { GlobalCategory } from '@prisma/client';

export class GlobalCategoryEntity implements GlobalCategory {
  uuid: string;
  name: string;
  comment: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(appInfo: Partial<GlobalCategory>) {
    Object.assign(this, appInfo);
    return this;
  }
}
