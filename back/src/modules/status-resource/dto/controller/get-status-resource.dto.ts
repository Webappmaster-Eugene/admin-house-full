import { createZodDto } from 'nestjs-zod';
import { StatusResourceGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type StatusResourceGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceGetResponseDto extends createZodDto(StatusResourceGetCommand.ResponseSchema) {}
