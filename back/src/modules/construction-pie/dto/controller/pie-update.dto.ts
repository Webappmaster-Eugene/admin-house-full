import { createZodDto } from 'nestjs-zod';
import { ConstructionPieUpdateCommand } from 'libs/contracts';

export class ConstructionPieUpdateRequestDto extends createZodDto(ConstructionPieUpdateCommand.RequestSchema) {}
export class ConstructionPieUpdateResponseDto extends createZodDto(ConstructionPieUpdateCommand.ResponseSchema) {}
