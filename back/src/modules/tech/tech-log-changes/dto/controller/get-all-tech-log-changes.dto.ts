import { createZodDto } from 'nestjs-zod';
import { TechLogChangesGetAllCommand } from 'libs/contracts';

export class TechLogChangesGetAllResponseDto extends createZodDto(TechLogChangesGetAllCommand.ResponseSchema) {}
