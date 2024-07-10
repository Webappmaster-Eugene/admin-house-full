import { createZodDto } from 'nestjs-zod';
import { RoleDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type RoleDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class RoleDeleteResponseDto extends createZodDto(RoleDeleteCommand.ResponseSchema) {}
