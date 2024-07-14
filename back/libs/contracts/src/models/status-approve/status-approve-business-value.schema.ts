import { StatusApproveSchema } from './status-approve.schema';

export const StatusApproveBusinessValueSchema = StatusApproveSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});
