import { createZodDto } from 'nestjs-zod';
import { PieLayerUpdateCommand } from 'libs/contracts';

export class PieLayerUpdateRequestDto extends createZodDto(PieLayerUpdateCommand.RequestSchema) {}
export class PieLayerUpdateResponseDto extends createZodDto(PieLayerUpdateCommand.ResponseSchema) {}
