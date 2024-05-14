import { createZodDto } from 'nestjs-zod';
import { MaterialGetAllCommand } from '../../../../../libs/contracts';

export class MaterialGetAllResponseDto extends createZodDto(
  MaterialGetAllCommand.ResponseSchema,
) {}
