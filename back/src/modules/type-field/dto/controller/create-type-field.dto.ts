import { createZodDto } from 'nestjs-zod';
import { TypeFieldCreateCommand } from '../../../../../libs/contracts';

export class TypeFieldCreateRequestDto extends createZodDto(
  TypeFieldCreateCommand.RequestSchema,
) {}

export class TypeFieldCreateResponseDto extends createZodDto(
  TypeFieldCreateCommand.ResponseSchema,
) {}
