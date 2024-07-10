import { UserSchema } from './user.schema';

export const UserBusinessValueSchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});
