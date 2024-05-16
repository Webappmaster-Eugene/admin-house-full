import { createZodDto } from 'nestjs-zod';
import { HandbookGetAllCommand } from '@numart/house-admin-contracts';

export class HandbookGetAllResponseDto extends createZodDto(HandbookGetAllCommand.ResponseSchema) {}
