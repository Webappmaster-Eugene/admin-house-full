import { createZodDto } from 'nestjs-zod';
import { StatusResourceUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type StatusResourceUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceUpdateRequestDto extends createZodDto(StatusResourceUpdateCommand.RequestSchema) {}

export class StatusResourceUpdateResponseDto extends createZodDto(StatusResourceUpdateCommand.ResponseSchema) {}