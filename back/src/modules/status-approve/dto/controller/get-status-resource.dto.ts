import { createZodDto } from 'nestjs-zod';
import { StatusResourceGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type StatusResourceGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceGetResponseDto extends createZodDto(StatusResourceGetCommand.ResponseSchema) {}
