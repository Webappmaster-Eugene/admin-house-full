import { createZodDto } from 'nestjs-zod';
import { HandbookGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type HandbookGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookGetResponseDto extends createZodDto(HandbookGetCommand.ResponseSchema) {}
