import { createZodDto } from 'nestjs-zod';
import { HandbookGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type HandbookGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookGetResponseDto extends createZodDto(HandbookGetCommand.ResponseSchema) {}
