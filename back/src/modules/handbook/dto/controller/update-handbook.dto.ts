import { createZodDto } from 'nestjs-zod';
import { HandbookUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type HandbookUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class HandbookUpdateRequestDto extends createZodDto(HandbookUpdateCommand.RequestSchema) {}

export class HandbookUpdateResponseDto extends createZodDto(HandbookUpdateCommand.ResponseSchema) {}
