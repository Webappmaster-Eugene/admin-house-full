import { createZodDto } from 'nestjs-zod';
import { HandbookUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type HandbookUpdateRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class HandbookUpdateRequestDto extends createZodDto(
  HandbookUpdateCommand.RequestSchema,
) {}

export class HandbookUpdateResponseDto extends createZodDto(
  HandbookUpdateCommand.ResponseSchema,
) {
  constructor(handbook: Partial<HandbookUpdateResponseDto>) {
    super();
    Object.assign(this, handbook);
    return this;
  }
}