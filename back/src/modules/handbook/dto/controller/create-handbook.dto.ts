import { createZodDto } from 'nestjs-zod';
import { HandbookCreateCommand } from '../../../../../libs/contracts';

export class HandbookCreateRequestDto extends createZodDto(
  HandbookCreateCommand.RequestSchema,
) {}

export class HandbookCreateResponseDto extends createZodDto(
  HandbookCreateCommand.ResponseSchema,
) {
  constructor(handbook: Partial<HandbookCreateResponseDto>) {
    super();
    Object.assign(this, handbook);
    return this;
  }
}