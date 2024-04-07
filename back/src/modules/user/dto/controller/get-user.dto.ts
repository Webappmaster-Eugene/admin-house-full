import { createZodDto } from 'nestjs-zod';
import { UserGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type UserGetRequestParamDto = EntityUrlParamCommand.RequestParam;

export class UserGetResponseDto extends createZodDto(
  UserGetCommand.ResponseSchema,
) {
  constructor(user: Partial<UserGetResponseDto>) {
    super();
    Object.assign(this, user);
    return this;
  }
}
