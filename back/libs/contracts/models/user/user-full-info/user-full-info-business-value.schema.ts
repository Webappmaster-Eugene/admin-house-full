import { UserFullInfoSchema } from './user-full-info.schema';

export const UserFullInfoBusinessValueSchema = UserFullInfoSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});
