import { createZodDto } from 'nestjs-zod';
import { FieldTypeCreateCommand } from 'libs/contracts';

export class FieldTypeCreateRequestDto extends createZodDto(FieldTypeCreateCommand.RequestSchema) {}

export class FieldTypeCreateResponseDto extends createZodDto(FieldTypeCreateCommand.ResponseSchema) {}
