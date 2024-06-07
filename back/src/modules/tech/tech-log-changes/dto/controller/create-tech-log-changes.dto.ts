import { createZodDto } from 'nestjs-zod';
import { TechLogChangesCreateCommand } from '@numart/house-admin-contracts';

export class TechLogChangesCreateRequestDto extends createZodDto(TechLogChangesCreateCommand.RequestSchema) {}

export class TechLogChangesCreateResponseDto extends createZodDto(TechLogChangesCreateCommand.ResponseSchema) {}
