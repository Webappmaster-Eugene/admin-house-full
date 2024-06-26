import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const UserAddToOrganizationResponseEntitySchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

const UserAddToOrganizationRequestSchema = UserSchema.pick({
  uuid: true,
  //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
  //пользователя в организацию (не в исходном входном dto, поступившего из контроллера, там только userId)
  memberOfOrganizationUuid: true,
});

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
