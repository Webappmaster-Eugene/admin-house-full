import { createZodDto } from 'nestjs-zod';
import { TechLogChangesGetAllCommand } from '@numart/house-admin-contracts';

export class TechLogChangesGetAllResponseDto extends createZodDto(TechLogChangesGetAllCommand.ResponseSchema) {}
