import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const UserAddToProjectResponseEntitySchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

const UserAddToProjectRequestSchema = UserSchema.pick({
  uuid: true,
  memberOfProjectUuid: true,
});

const UserAddToProjectResponseSchema = z
  .object({
    data: UserAddToProjectResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserAddToProjectCommand {
  export const RequestSchema = UserAddToProjectRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserAddToProjectResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToProjectResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
