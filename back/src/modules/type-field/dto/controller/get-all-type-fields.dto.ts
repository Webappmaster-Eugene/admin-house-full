import { createZodDto } from 'nestjs-zod';
import { TypeFieldGetAllCommand } from '../../../../../libs/contracts';

export class TypeFieldGetAllResponseDto extends createZodDto(
  TypeFieldGetAllCommand.ResponseSchema,
) {}
