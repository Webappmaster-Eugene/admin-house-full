import { unknown, z } from 'zod';
import { RoleSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';
import { Res } from '@nestjs/common';

const RoleGetAllResponseSchema = z
  .object({
    data: z.array(
      RoleSchema.pick({
        uuid: true,
        idRole: true,
        name: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace RoleGetAllCommand {
  export const ResponseSchema = RoleGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
