import { createZodDto } from 'nestjs-zod';
import { UserDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type UserDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class UserDeleteResponseDto extends createZodDto(UserDeleteCommand.ResponseSchema) {}
