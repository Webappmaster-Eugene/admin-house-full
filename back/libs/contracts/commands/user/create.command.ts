import { z } from 'zod';
import { ResponseClientSchema, UserBusinessValueSchema, UserRelatedEntitiesSchema, UserSchema } from '../../models';

const UserCreateResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserCreateRequestSchema = UserSchema.pick({
  avatar: true,
  info: true,
  address: true,
  secondName: true,
  documents: true,
  email: true,
  password: true,
  firstName: true,
  phone: true,
});

const UserCreateResponseSchema = z
  .object({
    data: UserCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserCreateCommand {
  export const RequestSchema = UserCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
