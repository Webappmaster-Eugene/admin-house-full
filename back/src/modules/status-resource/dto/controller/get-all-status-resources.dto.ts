import { createZodDto } from 'nestjs-zod';
import { StatusResourceGetAllCommand } from '@numart/house-admin-contracts';

export class StatusResourceGetAllResponseDto extends createZodDto(StatusResourceGetAllCommand.ResponseSchema) {}
