import { createZodDto } from 'nestjs-zod';
import { HandbookGetAllCommand } from '../../../../../libs/contracts';

export class HandbookGetAllResponseDto extends createZodDto(
  HandbookGetAllCommand.ResponseSchema,
) {
  constructor(handbook: Partial<HandbookGetAllResponseDto>) {
    super();
    Object.assign(this, handbook);
    return this;
  }
}
