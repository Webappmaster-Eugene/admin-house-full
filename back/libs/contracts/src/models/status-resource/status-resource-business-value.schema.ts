import { StatusResourceSchema } from './status-resource.schema';

export const StatusResourceBusinessValueSchema = StatusResourceSchema.pick({
  name: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});
