import { createZodDto } from 'nestjs-zod';
import { UserDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type UserDeleteRequestParamDto = EntityUrlParamCommand.RequestParam;

export class UserDeleteResponseDto extends createZodDto(
  UserDeleteCommand.ResponseSchema,
) {
  constructor(user: Partial<UserDeleteResponseDto>) {
    super();
    Object.assign(this, user);
    return this;
  }
}