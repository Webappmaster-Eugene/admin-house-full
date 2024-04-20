import { AppSettings } from '@prisma/client';
import {
  ECurrencyTypeVariantsType,
  ELanguagesTypeVariantsType,
  EStatusAppType,
} from '../../../common/generated/zod';

export class AppInfoEntity implements AppSettings {
  uuid: string;
  comment: string;
  description: string;
  language: ELanguagesTypeVariantsType;
  status: EStatusAppType;
  name: string;
  currency: ECurrencyTypeVariantsType;

  constructor(appInfo: Partial<AppSettings>) {
    Object.assign(this, appInfo);
    return this;
  }
}
