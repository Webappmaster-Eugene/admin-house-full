import { createZodDto } from 'nestjs-zod';
import { MaterialCreateCommand } from '../../../../../libs/contracts';

export class MaterialCreateRequestDto extends createZodDto(
  MaterialCreateCommand.RequestSchema,
) {}

export class MaterialCreateResponseDto extends createZodDto(
  MaterialCreateCommand.ResponseSchema,
) {}
