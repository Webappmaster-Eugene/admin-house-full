import { z } from 'zod';
import { ResponseClientSchema, UserSchema } from '../../models';
import { UserBusinessValueSchema } from '../../models/user/user-business-value.schema';
import { UserRelatedEntitiesSchema } from '../../models/user/user-related-entities.schema';
import { UserMemberOfOrganizationsSchema } from '../../models/user/user-member/user-member-organizations.schema';

const UserAddToOrganizationResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema);

const UserAddToOrganizationRequestSchema = UserSchema.pick({
  uuid: true,
  //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
  //пользователя в организацию (не в исходном входном dto, поступившем из контроллера, там только userId)
}).merge(UserMemberOfOrganizationsSchema);

const UserAddToOrganizationResponseSchema = z
  .object({
    data: UserAddToOrganizationResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserAddToOrganizationCommand {
  export const RequestSchema = UserAddToOrganizationRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserAddToOrganizationResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToOrganizationResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
