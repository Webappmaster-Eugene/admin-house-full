import { AppInfoSchema } from './app-info.schema';

export const AppInfoBusinessValueSchema = AppInfoSchema.pick({
  name: true,
  description: true,
  currency: true,
  language: true,
  comment: true,
  status: true,
  lastChangeByUserUuid: true,
});
