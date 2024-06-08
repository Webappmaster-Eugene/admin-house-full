import { createZodDto } from 'nestjs-zod';
import { StatusResourceDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type StatusResourceDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceDeleteResponseDto extends createZodDto(StatusResourceDeleteCommand.ResponseSchema) {}
