import { createZodDto } from 'nestjs-zod';
import { StatusResourceUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type StatusResourceUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class StatusResourceUpdateRequestDto extends createZodDto(StatusResourceUpdateCommand.RequestSchema) {}

export class StatusResourceUpdateResponseDto extends createZodDto(StatusResourceUpdateCommand.ResponseSchema) {}
