import { createZodDto } from 'nestjs-zod';
import { UserUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type UserUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class UserUpdateRequestDto extends createZodDto(UserUpdateCommand.RequestSchema) {}

export class UserUpdateResponseDto extends createZodDto(UserUpdateCommand.ResponseSchema) {}
