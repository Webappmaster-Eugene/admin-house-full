import { createZodDto } from 'nestjs-zod';
import { HandbookGetAllCommand } from '../../../../../libs/contracts';

export class HandbookGetAllResponseDto extends createZodDto(
  HandbookGetAllCommand.ResponseSchema,
) {}
