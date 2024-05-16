import { createZodDto } from 'nestjs-zod';
import { HandbookCreateCommand } from '@numart/house-admin-contracts';

export class HandbookCreateRequestDto extends createZodDto(HandbookCreateCommand.RequestSchema) {}

export class HandbookCreateResponseDto extends createZodDto(HandbookCreateCommand.ResponseSchema) {}
