import { HandbookSchema } from './handbook.schema';

export const HandbookBusinessValueSchema = HandbookSchema.pick({
  name: true,
  description: true,
  canCustomerView: true,
  uuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
  lastChangeByUserUuid: true,
});