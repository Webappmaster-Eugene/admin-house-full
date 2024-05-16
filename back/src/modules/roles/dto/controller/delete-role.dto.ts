import { createZodDto } from 'nestjs-zod';
import { RoleDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type RoleDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class RoleDeleteResponseDto extends createZodDto(RoleDeleteCommand.ResponseSchema) {}
