import { createZodDto } from 'nestjs-zod';
import { TechLogChangesCreateCommand } from 'libs/contracts';

export class TechLogChangesCreateRequestDto extends createZodDto(TechLogChangesCreateCommand.RequestSchema) {}

export class TechLogChangesCreateResponseDto extends createZodDto(TechLogChangesCreateCommand.ResponseSchema) {}
