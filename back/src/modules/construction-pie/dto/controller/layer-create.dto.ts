import { createZodDto } from 'nestjs-zod';
import { PieLayerCreateCommand } from 'libs/contracts';

export class PieLayerCreateRequestDto extends createZodDto(PieLayerCreateCommand.RequestSchema) {}
export class PieLayerCreateResponseDto extends createZodDto(PieLayerCreateCommand.ResponseSchema) {}
