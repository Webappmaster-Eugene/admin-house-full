import { createZodDto } from 'nestjs-zod';
import { RoleGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type RoleGetUuidRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export type RoleGetIdRequestParamDto = EntityUrlParamCommand.RequestNumberParam;

export class RoleGetResponseDto extends createZodDto(RoleGetCommand.ResponseSchema) {}
