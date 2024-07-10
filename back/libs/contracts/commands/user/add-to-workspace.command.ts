import { z } from 'zod';
import { ResponseClientSchema, UserBusinessValueSchema, UserRelatedEntitiesSchema, UserSchema } from '../../models';

const UserAddToWorkspaceResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserAddToWorkspaceRequestSchema = UserSchema.pick({
  uuid: true,
  //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
  //пользователя в организацию (не в исходном входном dto, поступившего из контроллера, там только userId)
  memberOfWorkspaceUuid: true,
});

const UserAddToWorkspaceResponseSchema = z
  .object({
    data: UserAddToWorkspaceResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserAddToWorkspaceCommand {
  export const RequestSchema = UserAddToWorkspaceRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserAddToWorkspaceResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToWorkspaceResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
