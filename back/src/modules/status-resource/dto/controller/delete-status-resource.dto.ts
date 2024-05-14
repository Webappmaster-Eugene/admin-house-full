import { createZodDto } from 'nestjs-zod';
import { StatusResourceDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type StatusResourceDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceDeleteResponseDto extends createZodDto(StatusResourceDeleteCommand.ResponseSchema) {}
