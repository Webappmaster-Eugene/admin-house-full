import { createZodDto } from 'nestjs-zod';
import {
  UserUpdateCommand,
  UserUpdateCommand,
} from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type UserUpdateRequestParamDto = EntityUrlParamCommand.RequestParam;

export class UserUpdateRequestDto extends createZodDto(
  UserUpdateCommand.RequestSchema,
) {}

export class UserUpdateResponseDto extends createZodDto(
  UserUpdateCommand.ResponseSchema,
) {
  constructor(user: Partial<UserUpdateResponseDto>) {
    super();
    Object.assign(this, user);
    return this;
  }
}