import { createZodDto } from 'nestjs-zod';
import { HandbookDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type HandbookDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookDeleteResponseDto extends createZodDto(HandbookDeleteCommand.ResponseSchema) {}
