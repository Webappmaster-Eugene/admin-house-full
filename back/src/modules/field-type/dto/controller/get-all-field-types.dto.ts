import { createZodDto } from 'nestjs-zod';
import { FieldTypeGetAllCommand } from '../../../../../libs/contracts';

export class FieldTypeGetAllResponseDto extends createZodDto(FieldTypeGetAllCommand.ResponseSchema) {}
