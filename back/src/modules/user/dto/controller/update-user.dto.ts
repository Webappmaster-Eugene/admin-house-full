import { createZodDto } from 'nestjs-zod';
import { UserUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type UserUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class UserUpdateRequestDto extends createZodDto(UserUpdateCommand.RequestSchema) {}

export class UserUpdateResponseDto extends createZodDto(UserUpdateCommand.ResponseSchema) {}
