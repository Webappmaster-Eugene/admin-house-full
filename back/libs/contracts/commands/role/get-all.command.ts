import { z } from 'zod';
import { EUserTypeVariantsSchema } from '../../../../src/generated/zod';
import { UserSchema } from '../../models/user';

const RoleGetAllResponseSchema = z.object({
  data: z.array(UserSchema),
  count: z.number().nonnegative(),
});

export namespace RoleGetAllCommand {
  export const ResponseSchema = RoleGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
