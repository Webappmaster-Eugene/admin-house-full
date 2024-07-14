import { TechLogChangesSchema } from './tech-log-changes.schema';

export const TechLogChangesBusinessValueSchema = TechLogChangesSchema.pick({
  name: true,
  entity: true,
  comment: true,
  oldInfo: true,
  newInfo: true,
  updateInfo: true,
  action: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
});
