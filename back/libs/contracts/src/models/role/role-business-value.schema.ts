import { RoleSchema } from './role.schema';

export const RoleBusinessValueSchema = RoleSchema.pick({
  uuid: true,
  idRole: true,
  name: true,
  description: true,
  lastChangeByUserUuid: true,
});
