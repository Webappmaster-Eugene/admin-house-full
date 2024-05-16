import { createZodDto } from 'nestjs-zod';
import { RoleGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type RoleGetUuidRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export type RoleGetIdRequestParamDto = EntityUrlParamCommand.RequestNumberParam;

export class RoleGetResponseDto extends createZodDto(RoleGetCommand.ResponseSchema) {}
