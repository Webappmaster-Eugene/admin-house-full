import { createZodDto } from 'nestjs-zod';
import { PieLayerDeleteCommand } from 'libs/contracts';

export class PieLayerDeleteResponseDto extends createZodDto(PieLayerDeleteCommand.ResponseSchema) {}
