import { ECurrencyTypeVariantsType, ELanguagesTypeVariantsType, EStatusAppType } from '../../../common/generated/zod';
import { AppInfo } from '.prisma/client';

export class AppInfoEntity implements AppInfo {
  uuid: string;
  comment: string;
  description: string;
  language: ELanguagesTypeVariantsType;
  status: EStatusAppType;
  name: string;
  currency: ECurrencyTypeVariantsType;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(appInfo: Partial<AppInfo>) {
    Object.assign(this, appInfo);
    return this;
  }
}
