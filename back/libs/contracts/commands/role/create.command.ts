import { z } from 'zod';
import { RoleSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const RoleCreateResponseEntitySchema = RoleSchema.pick({
  uuid: true,
  idRole: true,
  name: true,
  description: true,
  lastChangeByUserUuid: true,
});

const RoleCreateRequestSchema = RoleSchema.pick({
  name: true,
  description: true,
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
