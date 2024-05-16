import { createZodDto } from 'nestjs-zod';
import { FieldTypeGetAllCommand } from '@numart/house-admin-contracts';

export class FieldTypeGetAllResponseDto extends createZodDto(FieldTypeGetAllCommand.ResponseSchema) {}
