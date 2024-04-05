import { z } from 'zod';
import { EUserTypeVariantsSchema } from '../../../../src/generated/zod';
import { RoleSchema } from '../../models/role';

const RoleCreateRequestSchema = RoleSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  z.object({
    key: z.string(),
  }),
);

const RoleCreateResponseSchema = RoleSchema;

export namespace RoleCreateCommand {
  export const RequestSchema = RoleCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = RoleCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
