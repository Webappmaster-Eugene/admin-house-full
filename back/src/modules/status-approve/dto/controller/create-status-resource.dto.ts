import { createZodDto } from 'nestjs-zod';
import { StatusResourceCreateCommand } from '@numart/house-admin-contracts';

export class StatusResourceCreateRequestDto extends createZodDto(StatusResourceCreateCommand.RequestSchema) {}

export class StatusResourceCreateResponseDto extends createZodDto(StatusResourceCreateCommand.ResponseSchema) {}
