import { createZodDto } from 'nestjs-zod';
import { RoleUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type RoleUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class RoleUpdateRequestDto extends createZodDto(RoleUpdateCommand.RequestSchema) {}

export class RoleUpdateResponseDto extends createZodDto(RoleUpdateCommand.ResponseSchema) {}
