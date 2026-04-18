import { createZodDto } from 'nestjs-zod';
import { ConstructionPieGetAllCommand, ConstructionPieGetCommand, ConstructionPieDeleteCommand } from 'libs/contracts';

export class ConstructionPieGetResponseDto extends createZodDto(ConstructionPieGetCommand.ResponseSchema) {}
export class ConstructionPieGetAllResponseDto extends createZodDto(ConstructionPieGetAllCommand.ResponseSchema) {}
export class ConstructionPieDeleteResponseDto extends createZodDto(ConstructionPieDeleteCommand.ResponseSchema) {}
