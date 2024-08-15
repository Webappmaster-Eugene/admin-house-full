import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { UserUpdateRolesCommand } from 'libs/contracts/src/commands/user/update-roles.command';

export type UserUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class UserUpdateRolesRequestDto extends createZodDto(UserUpdateRolesCommand.RequestSchema) {}

export class UserUpdateRolesResponseDto extends createZodDto(UserUpdateRolesCommand.ResponseSchema) {}
