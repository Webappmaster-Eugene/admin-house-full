import { createZodDto } from 'nestjs-zod';
import { HandbookUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type HandbookUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookUpdateRequestDto extends createZodDto(HandbookUpdateCommand.RequestSchema) {}

export class HandbookUpdateResponseDto extends createZodDto(HandbookUpdateCommand.ResponseSchema) {}
