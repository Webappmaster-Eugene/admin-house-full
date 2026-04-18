import { createZodDto } from 'nestjs-zod';
import { ConstructionPieCreateCommand } from 'libs/contracts';

export class ConstructionPieCreateRequestDto extends createZodDto(ConstructionPieCreateCommand.RequestSchema) {}
export class ConstructionPieCreateResponseDto extends createZodDto(ConstructionPieCreateCommand.ResponseSchema) {}
