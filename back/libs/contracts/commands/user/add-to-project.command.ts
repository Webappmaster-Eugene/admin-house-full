import { z } from 'zod';
import { UserBusinessValueSchema, UserRelatedEntitiesSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const UserAddToProjectResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserAddToProjectRequestSchema = UserSchema.pick({
  uuid: true,
  //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
  //пользователя в организацию (не в исходном входном dto, поступившего из контроллера, там только userId)
  memberOfProjectUuid: true,
});

const UserAddToProjectResponseSchema = z
  .object({
    data: UserAddToProjectResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserAddToProjectCommand {
  export const RequestSchema = UserAddToProjectRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserAddToProjectResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToProjectResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
