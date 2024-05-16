import { createZodDto } from 'nestjs-zod';
import { FieldTypeCreateCommand } from '@numart/house-admin-contracts';

export class FieldTypeCreateRequestDto extends createZodDto(FieldTypeCreateCommand.RequestSchema) {}

export class FieldTypeCreateResponseDto extends createZodDto(FieldTypeCreateCommand.ResponseSchema) {}
