import { z } from 'zod';
import { RoleBusinessValueSchema } from '../../models/role/role-business-value.schema';
import { ResponseClientSchema, RoleSchema } from '../../models';

const RoleCreateResponseEntitySchema = RoleBusinessValueSchema;

const RoleCreateRequestSchema = RoleSchema.pick({
  name: true,
  description: true,
  idRole: true,
}).merge(
  z.object({
    key: z.string(),
  }),
);

const RoleCreateResponseSchema = z
  .object({
    data: RoleCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace RoleCreateCommand {
  export const RequestSchema = RoleCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = RoleCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
