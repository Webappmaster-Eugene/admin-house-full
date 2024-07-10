import { createZodDto } from 'nestjs-zod';
import { StatusResourceGetAllCommand } from 'libs/contracts';

export class StatusResourceGetAllResponseDto extends createZodDto(StatusResourceGetAllCommand.ResponseSchema) {}
