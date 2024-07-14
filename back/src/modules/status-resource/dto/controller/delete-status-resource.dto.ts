import { createZodDto } from 'nestjs-zod';
import { StatusResourceDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type StatusResourceDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceDeleteResponseDto extends createZodDto(StatusResourceDeleteCommand.ResponseSchema) {}
