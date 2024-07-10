import { z } from 'zod';
import { UserBusinessValueSchema, UserRelatedEntitiesSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const UserAddToOrganizationResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserAddToOrganizationRequestSchema = UserSchema.pick({
  uuid: true,
  //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
  //пользователя в организацию (не в исходном входном dto, поступившем из контроллера, там только userId)
  memberOfOrganizationUuid: true,
});

const UserAddToOrganizationResponseSchema = z
  .object({
    data: UserAddToOrganizationResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserAddToOrganizationCommand {
  export const RequestSchema = UserAddToOrganizationRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserAddToOrganizationResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToOrganizationResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
